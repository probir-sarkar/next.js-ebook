
import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from 'cloudflare:workers';
import { getDb } from '@/db';
import { subscribe } from '@/db/schema';
import { eq } from 'drizzle-orm';


type Params = {
    email: string
};

// Create your own class that implements a Workflow
export class NextJSEbookWorkflow extends WorkflowEntrypoint<CloudflareBindings, Params> {
    // Define a run() method
    async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
        // Define one or more steps that optionally return state.
        let state = step.do('send email', async () => {
            const db = getDb(this.env);
            // is email exists?
            const result = await db
                .select()
                .from(subscribe)
                .where(eq(subscribe.email, event.payload.email))
                .limit(1);
            if (result.length > 0) {
                // send email
                await db.update(subscribe).set({ emailSent: true }).where(eq(subscribe.email, event.payload.email));
                return { status: 'success' };
            }
            return { status: 'fail' };
        });

    }
}

