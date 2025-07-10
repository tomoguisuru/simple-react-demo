import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Stack } from "react-bootstrap";

const AdviceCard = ({ advice }) => (
  <Card>
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <p>{advice}</p>
      </blockquote>
    </Card.Body>
  </Card>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState("");
  const [adviceCount, setAdviceCount] = useState(0);

  async function getAdvice() {
    try {
      setIsLoading(true);
      const url = "https://api.adviceslip.com/advice";
      const resp = await fetch(url);
      const json = await resp.json();

      setAdvice(json?.slip?.advice);
      setAdviceCount((c) => c + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <Container>
        <Stack>
          <h1>Welcome!</h1>
          <p>Here's some sage advice!</p>

          {advice && <AdviceCard advice={advice} />}
          <br />
          <Button
            variant="primary"
            onClick={!isLoading ? getAdvice : null}
            disabled={isLoading}
          >
            Get More Advice
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>

          <p>
            You have read <strong>{adviceCount}</strong> pieces of advice
          </p>
        </Stack>
      </Container>
    </>
  );
}
