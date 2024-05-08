type MessageOf<T extends { message: any }> = T['message'] extends (...args: any[]) => any ? never : T['message']

interface EmailMessage {
    message: string
}

interface HandleMessage {
    message(input: string): string
}

interface Cat {
    wow: void
}

type EmailMessageType = MessageOf<EmailMessage>
const emailMessageContents: EmailMessageType = "Email contents"

type HandleMessageType = MessageOf<HandleMessage> // type HandleMessageType = (input: string) => string
// let HandleMessage: HandleMessageType = (input: string) => "Handled: " + input // Type '(input: string) => string' is not assignable to type 'never'.ts(2322)

// type CatMessageType =  MessageOf<Cat>; // Type 'Cat' does not satisfy the constraint '{ message: any; }'. Property 'message' is missing in type 'Cat' but required in type '{ message: any; }'.ts(2344)

export { }