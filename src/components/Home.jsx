import { Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GroupIcon from "@material-ui/icons/Group";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#FFFDD0",
    textAlign: "center",
    opacity: "0.8",
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#fff3cd",
    backgroundImage: 'url("sun-tornado.svg")',
    /* background by SVGBackgrounds.com */
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0px 3px 5px 2px rgba(255, 187, 56, .3)",
    borderRadius: "15px",
    height: "320px ",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "72px",
  },
  icon: {
    fontSize: "6rem",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(24),
  },
}));

// export default function Home() {
//   return (
//     <>
//       <Layout>
//         <div className="btn w-5 h-5 "></div>
//           <div className="w-full banner-wrapper mb-[60px]">
//             <div className="container-x mx-auto">
//               <div className="main-wrapper w-full">
//                 <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]">
//                   <div data-aos="fade-right" className="xl:w-[740px] w-full h-full">
//                     <a href="/about">
//                       <picture>
//                         <source
//                           media="(min-width:1025px)"
//                           srcSet={`${process.env.PUBLIC_URL}/assets/images/banner-1.png`}
//                         />
//                         <img
//                           src={`${process.env.PUBLIC_URL}/assets/images/banner-1.2.png`}
//                           alt=""
//                           className="w-full max-w-full h-auto object-cover"
//                         />
//                       </picture>
//                     </a>
//                   </div>
//                   <div
//                     data-aos="fade-left"
//                     className="flex-1 flex xl:flex-col flex-row  xl:space-y-[30px] h-full"
//                   >
//                     <div className="w-full xl:h-1/2">
//                       <a href="/event">
//                         <img
//                           src={`${process.env.PUBLIC_URL}/assets/images/banner-2.png`}
//                           alt=""
//                           className="w-full h-full"
//                         />
//                       </a>
//                     </div>
//                     <div className="w-full xl:h-1/2">
//                       <a href="/chapter">
//                         <img
//                           src={`${process.env.PUBLIC_URL}/assets/images/banner-3.png`}
//                           alt=""
//                           className="w-full h-full"
//                         />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </Layout>
//     </>
//   );
// }
//  function GoCreateQuiz() {
//   window.location.href = "/quiz/create";
// }

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <ToastContainer />
      <Layout>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.title}>
            Welcome to UncoverGem
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <QuestionAnswerIcon className={classes.icon} color="primary" />
                <Typography variant="h5" component="h2">
                  Host Quizzes
                </Typography>
                <Typography>
                  Boost your sales by hosting engaging quizzes for your
                  customers.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <GroupIcon className={classes.icon} color="primary" />
                <Typography variant="h5" component="h2">
                  Engage Users
                </Typography>
                <Typography>
                  Engage your users with fun and interactive quizzes.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <TrendingUpIcon className={classes.icon} color="primary" />
                <Typography variant="h5" component="h2">
                  Boost Sales
                </Typography>
                <Typography>
                  Increase your product sales by understanding customer
                  preferences.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </>
  );
};

export default Home;
