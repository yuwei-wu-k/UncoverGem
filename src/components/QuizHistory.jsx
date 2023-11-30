import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    backButton: {
        marginTop: '60px',
        marginBottom: '40px',
        borderRadius: '50px',
    }
});

export default function QuizHistory() {
    const classes = useStyles();

    // Retrieve the quiz history from localStorage
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

    return (
        <Container maxWidth="md">
            <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/dashboard"
                className={classes.backButton}
            >
                Go Back
            </Button>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="quiz history table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Quiz Attempt #</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">Score</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizHistory.map((quizResult, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body1">Quiz Attempt {index + 1}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body1">{quizResult.score} / {quizResult.total}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    );
}
