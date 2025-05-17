// components/emails/NextJsEbookDownload.tsx
/** @jsxImportSourceTypes npm:@types/react@^18.3 */
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

interface NextJsEbookDownloadProps {
  name?: string;
  downloadLink: string;
}

export const NextJsEbookDownload = ({
  name = "there",
  downloadLink,
}: NextJsEbookDownloadProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Next.js eBook is ready to download!</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", padding: "40px 0" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "32px",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            Hi {name},
          </Text>

          <Text style={{ fontSize: "16px" }}>
            Thanks for your interest in the <strong>Next.js eBook</strong>!
            Click the button below to download your copy.
          </Text>

          <Button
            href={downloadLink}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "6px",
              fontSize: "16px",
              textDecoration: "none",
              margin: "20px 0",
            }}
          >
            📘 Download eBook
          </Button>

          <Text style={{ fontSize: "14px", color: "#555" }}>
            This eBook is for personal use only. It is not intended for
            commercial use.
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#f00",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Please note: This link will expire in 3 days.
          </Text>

          <Hr />

          <Text style={{ fontSize: "12px", color: "#888" }}>
            You're receiving this email because you subscribed or requested the
            Next.js eBook.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NextJsEbookDownload;
