import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { type, feedback } = await request.json();

        const { data, error } = await resend.emails.send({
            from: "Tracklet <onboarding@resend.dev>",
            to: ["tracklet.app@gmail.com"],
            subject: `New Feedback: ${type}`,
            html: `
                <h2>New Feedback Received</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Feedback:</strong></p>
                <p style="white-space: pre-wrap;">${feedback}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">Sent from Tracklet Feedback Form</p>
            `,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
