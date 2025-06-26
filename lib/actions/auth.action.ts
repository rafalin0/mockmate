'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 

export async function setSessionCookie(idToken: string) {
   const cookieStore = await cookies();

   // Create a session cookie with the provided ID token
   const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000}); // 7 days
    
   // Set the session cookie in the browser
   cookieStore.set('session', sessionCookie, {
      httpOnly: true, 
      maxAge: ONE_WEEK,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead.',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
    }

  } catch(error: any) {
    console.error('Error during sign up:', error);


    if (error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email already exists. Please use a different email address.',
      };
    }
    }

    return {
      success: false,
      message: 'Failed to create an account. Please try again.',      
    }   
}

export async function signIn(params: SignInParams) {

  const { email, idToken } = params;
  
  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an acount instead.',
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Signed in successfully.',
    };

  } catch (error: any) {
    console.log('Error during sign in:', error);  

    return {
      success: false,
      message: 'Failed to log into an account. Please try again.',
    };
  }
}
    
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;

  if(!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true); 

    const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch (error) {
    console.log('Error verifying session cookie:', error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
