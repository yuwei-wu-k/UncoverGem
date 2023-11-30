import { Button, Grid, Link, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import { useQuizzes } from "../../../QuizContext";
import { getPrefix, getSession } from "../../../lib/Bandung";

const useStyles = makeStyles((theme) => ({
  dashboardRoot: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(-2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  quizHistoryContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  infoContainer: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  quizCount: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    background: theme.palette.grey[200],
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    color: theme.palette.grey[800],
  },
}));

export default function DashboardTab() {
  const classes = useStyles();
  const [quizzes, setQuizzes] = useState([]);
  // const { quizzes, setQuizzes } = useQuizzes();
  // console.log("Quizzes:", quizzes);

  // useEffect(() => {
  //   const sessionObject = JSON.parse(localStorage.getItem("bandung"));
  //   const userId = sessionObject ? sessionObject.userEntityId : null;

  //   Axios.get(`http://localhost:5000/https://www.uncovergem.com/app/quiz/listbyuser?userEntityId=${userId}`)
  //     .then(response => {
  //       if (Array.isArray(response.data)) {
  //         setQuizzes(response.data);
  //       } else {
  //         console.error("Unexpected server response:", response.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch quizzes:", error);
  //     });
  // }, []);

  // this one
  useEffect(() => {
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userId = sessionObject ? sessionObject.userEntityId : null;

    Axios.get(
      `${getPrefix()}/app/quiz/listbyuser?userEntityId=${userId}&page=-1`
    )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setQuizzes((prevQuizzes) => {
            console.log("Previous quizzes:", prevQuizzes);
            console.log("New quizzes:", response.data);
            return response.data;
          });
        } else {
          console.error("Unexpected server response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch quizzes:", error);
      });
  }, []);

  return (
    <div className={classes.dashboardRoot}>
      <Typography
        variant="h4"
        color="textSecondary"
        gutterBottom
        className={classes.header}
      >
        Explore your quiz details
      </Typography>

      <div className={classes.quizHistoryContainer}>
        <Typography variant="h6">
          No. of quizzes created: {quizzes.length}
        </Typography>
      </div>

      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={6}>
          <RouterLink to="/quiz-create" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" fullWidth>
              Create New Quiz
            </Button>
          </RouterLink>
        </Grid>
        <Grid item xs={6}>
          <RouterLink
            to="/view-created-quizzes"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary" fullWidth>
              View Created Quizzes
            </Button>
          </RouterLink>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        style={{ marginTop: "20px" }}
      >
        <Grid
          container
          spacing={3}
          className={classes.dashboardInfo}
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={6}>
            <Paper className={classes.infoContainer} elevation={2}>
              <Typography variant="h6" style={{ textDecoration: "underline" }}>
                Personal Information
              </Typography>
              <div>
                <Typography variant="body1">
                  First Name: {getSession().firstName}
                </Typography>
                <Typography variant="body1">
                  Last Name: {getSession().lastName}
                </Typography>
                <Typography variant="body1">
                  Email: {getSession().email}
                </Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.quizzesInfo}>
            <Paper className={classes.infoContainer} elevation={2}>
              <Typography variant="h6" style={{ textDecoration: "underline" }}>
                Recommended Quizzes
              </Typography>
              <div>
                <Typography variant="body1">
                  <Link href="https://uncovergem.com/quiz/">Quiz 1</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="https://uncovergem.com/quiz/">Quiz 2</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="https://uncovergem.com/quiz/">Quiz 3</Link>
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
