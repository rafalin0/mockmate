import { cn } from '@/lib/utils';
import Image from 'next/image'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CONNECTING = 'CONNECTING',
}

const Agent = ({userName}: AgentProps) => {
    const callStatus = CallStatus.COMPLETED; // This would typically come from props or state
    const isSpeaking = true;
    const messages = [
        'Hello, welcome to your mock interview!',
        'I am here to help you prepare for your interview.',
        'Let\'s start with some basic questions.',  
    ];
    const lastMessage = messages[messages.length - 1];

  return (
    <>
        <div className='call-view'>
            <div className="card-interviewer">
                <div className="avatar">
                    <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover'/>
                    {isSpeaking && <span className="animate-speak"/>}
                </div>
                <h3>AI Interviewer</h3>
            </div>

            <div className='card-border'>
                <div className='card-content'>
                    <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className='object-cover rounded-full size-[129px]'/>
                    <h3>{userName}</h3>
                </div>
            </div>
        </div>

        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadecIn opacity-100')}>
                        {lastMessage}
                    </p>
                </div>
            </div>
        )}

        <div className='w-full flex justify-center'>
            {callStatus !== 'ACTIVE' ? (
                <button className='btn-call relative'>
                    <span className={cn('absolute aniumate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')} />
                    <span> {callStatus === 'INACTIVE' || callStatus === 'COMPLETED' ? 'Call' : '. . .'  }</span>
                </button>
            ) 
            : (
                <button className="btn-disconnect">
                    <span>End</span>
                </button>
            )}
        </div>
    </>
  )
}

export default Agent