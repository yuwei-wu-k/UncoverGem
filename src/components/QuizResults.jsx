import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

export default function QuizResults() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Quiz Results
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/dashboard"
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>

      {/* Placeholder for quiz results */}
      <div style={{ marginTop: "20px" }}>
        <p>Quiz results.</p>
      </div>
    </Container>
  );
}
