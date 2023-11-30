import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import AddShop from "./AddShop";
// import Blog from "./Blog";
// import BlogItem from "./Blog/BlogItem";
// import CardPage from "./CartPage";
import Category from "./Category";
// import CheckoutPage from "./CheckoutPage";
import Compare from "./Compare";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Faq from "./Faq";
import FlashSale from "./FlashSale";
import ForgotPassword from "./ForgotPassword";
import FourZeroFour from "./FourZeroFour";
import Home from "./Home";
import Join from "./Join";
import UserEmailList from "./ListEmails";
import Privacy from "./Privacy";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import Profile from "./Profile";
import QuestionForm from "./QuestionForm";
import Quiz from "./Quiz";
import QuizCreate from "./QuizCreate";
import QuizDisplay from "./QuizDisplay";
import QuizHistory from "./QuizHistory";
import QuizQuestionsDisplay from "./QuizQuestionsDisplay";
import QuizQuestionsPage from "./QuizQuestionsPage";
import QuizList from "./QuizTakerQuizList";
import QuizView from "./QuizView";
import ShopList from "./ShopList";
import ShopView from "./ShopView";
import Signin from "./Signin";
import TakeQuiz from "./TakeQuiz";
import Terms from "./Terms";
import TrackingOrder from "./TrackingOrder";
import Wishlist from "./Wishlist";
import QuizResults from "./QuizResults";
// import PrivateRoute from "./routing/PrivateRoute";


// PrivateRoute component to protect authenticated routes
function PrivateRoute({ element }) {
  const keynameValue = localStorage.getItem("bandung");
  const isAuthenticated = keynameValue && JSON.parse(keynameValue).sessionToken;

  return isAuthenticated ? element : <Navigate to="/signin" />;
}


export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/addshop" element={<AddShop />} />
        {/* <Route exact path='/dashboard' element={<PrivateRoute/>}></Route> */}
        <Route exact path="/dashboard" element={<Dashboard />} />
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/resetpassword" element={<ForgotPassword />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/list-user-emails" element={<UserEmailList />} />

        <Route exact path="/productlist" element={<ProductList />} />
        <Route exact path="/productview" element={<ProductView />} />
        <Route exact path="/shoplist" element={<ShopList />} />
        <Route exact path="/shopview" element={<ShopView />} />

        {/* <Route exact path="/cart" element={<CardPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} /> */}
        <Route exact path="/order" element={<TrackingOrder />} />

        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/flash-sale" element={<FlashSale />} />
        <Route exact path="/compare" element={<Compare />} />

        {/* <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blogitem" element={<BlogItem />} /> */}
        <Route exact path="/about" element={<About />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/quiz-history" element={<QuizHistory />} />
        <Route exact path="/quiz-create" element={<QuizCreate />} />
        <Route exact path="/view-created-quizzes" element={<QuizView />} />
        <Route exact path="/add-quiz" element={<QuestionForm />} />
        <Route
          exact
          path="/display-quiz/:quizEntityId"
          element={<QuizDisplay />}
        />
        <Route
          exact
          path="/display-quiz-questions/:quizEntityId"
          element={<QuizQuestionsDisplay />}
        />
        <Route
          exact
          path="/quizquestions/:quizEntityId"
          element={<QuizQuestionsPage />}
        />
        <Route exact path="/quiz-taker-quiz-list" element={<QuizList />} />
        <Route exact path="/take-quiz/:quizEntityId" element={<TakeQuiz />} />

        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/faq" element={<Faq />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="*" element={<FourZeroFour />} />
        <Route exact path="/quiz-result" element={<QuizResults />} />
      </Routes>
    </BrowserRouter>
  );
}
