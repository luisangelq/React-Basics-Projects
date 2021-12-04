import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import Spinner from "../../components/Spinner";
import { loginAlert, errorAlert } from "../../helpers/validations/AlertHandler";

import FirebaseContext from "../../context/firebaseContext";
import firebaseState from "../../context/firebaseState";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const { user } = useContext(FirebaseContext);
  const { getProductRequest, updateProductRequest } = firebaseState();

  useEffect(() => {
    if (id) {
      getProductRequest(id, "products", setProduct);
    }
  }, [id]);

  const voteProduct = () => {
    if (!user) {
      loginAlert();

      // router.push(redirect);
      return;
    }

    const newProduct = {
      ...product,
      votes: product.votes + 1,
      votesUsers: [...product.votesUsers, user.uid],
    };

    if (product.votesUsers.includes(user.uid)) {
      const newProduct = {
        ...product,
        votes: product.votes - 1,
        //delete user from votesUsers
        votesUsers: product.votesUsers.filter((userId) => userId !== user.uid),
      };
      setProduct(newProduct);
      updateProductRequest(id, "products", newProduct);

      return;
    }

    setProduct(newProduct);
    updateProductRequest(id, "products", newProduct);
  };

  const addComment = () => {
    if (!user) {
      loginAlert();
      return;
    }

    if (!comment) {
      errorAlert({ general: "Please enter a comment" });
      return;
    }

    const newProduct = {
      ...product,
      comments: [
        ...product.comments,
        { text: comment, userName: user.displayName, userId: user.uid },
      ],
    };

    setProduct(newProduct);
    updateProductRequest(id, "products", newProduct);

    console.log(product);
    setComment("");
  };

  return (
    <MainLayout>
      {product ? (
        <Container>
          <ProductHeader>
            <div className="productCard">
              <img src={product.imageURL} alt={product.productName} />

              <div className="productTitle">
                <h2>{product.productName}</h2>
                <p>{product.quote}</p>
              </div>
            </div>

            <BtnContainer>
              <button> get it </button>

              <button
                onClick={voteProduct}
                className={
                  user
                    ? product.votesUsers.includes(user.uid)
                      ? "removeVote"
                      : "addVote"
                    : "addVote"
                }
              >
                &#x25B2; upvote · {product.votes}{" "}
              </button>
            </BtnContainer>
          </ProductHeader>

          <ProductDescription>
            <p>{product.description}</p>

            <div className="createdDate">
              <span>
                featured {moment(product.date).startOf("day").fromNow()}
              </span>
            </div>
          </ProductDescription>

          <Discussion>
            <h3>DISCUSSION</h3>

            <div className="commentsPanel">
              <div className="myComment">
                <img
                  src="https://ph-static.imgix.net/guest-user-avatar.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
                  alt="userIcon"
                />
                <input
                  type="text"
                  placeholder="What do you think about this product?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={addComment}>SEND</button>
              </div>

              <div className="peopleComments">
                <h3>Comments</h3>

                {product.comments
                  .map((comment) => (
                    <li key={Math.random()}>
                      <div className="user">
                        <img
                          src="https://ph-static.imgix.net/guest-user-avatar.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
                          alt="userIcon"
                        />
                        <h4>{comment.userName}</h4>
                      </div>

                      <p>{comment.text}</p>
                    </li>
                  ))
                  .reverse()}
              </div>
            </div>
          </Discussion>
        </Container>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 5rem auto;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem;
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 0.5rem;
  }

  .productCard {
    display: flex;
    color: var(--font-primary-color);

    @media (max-width: 480px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .productTitle {
    margin: 1rem 2rem;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 5rem;
  margin-top: 5rem;
  gap: 1rem;

  button {
    outline: none;
    padding: 1.5rem;
    min-width: 10rem;
    color: var(--font-primary-color);
    font-size: 1.2rem;
    border: 1px solid var(--gray);
    background: white;
    border-radius: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
  }

  .addVote {
    min-width: 25rem;
    background: #f64900;
    color: white;
    transition: all 0.3s ease-in-out;

    @media (max-width: 480px) {
      min-width: 20rem;
    }
  }

  .removeVote {
    min-width: 25rem;
    background: white;
    color: #f64900;
    border: 1px solid #f64900;
    transition: all 0.3s ease-in-out;

    @media (max-width: 480px) {
      min-width: 20rem;
    }
  }
`;

const ProductDescription = styled.div`
  margin: 5rem 2rem;
  padding: 2rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: white;
  grid-area: 2 / 1 / 3 / 3;

  .createdDate {
    display: flex;
    justify-content: flex-end;
    span {
      margin-top: 5rem;
      padding: 0.5rem;
      border: 1px solid var(--gray);
      border-radius: 0.5rem;
      font-size: 1rem;
      color: var(--font-primary-color);
      text-transform: uppercase;
    }
  }
`;

const Discussion = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h3 {
    margin: 2rem;
    font-size: 1.2rem;
    color: var(--font-primary-color);
  }

  .commentsPanel {
    margin: 2rem;
    background: white;
    border: 1px solid var(--gray);
    border-radius: 0.5rem;

    .myComment {
      display: flex;
      align-items: center;
      padding: 2rem;
      gap: 1.5rem;
      border-bottom: 1px solid var(--gray);

      img {
        border-radius: 100%;
      }

      input {
        width: 100%;
        padding: 1rem;
        border: 1px solid var(--gray);
        border-radius: 0.5rem;
        font-size: 1.4rem;
        outline: none;
      }

      button {
        outline: none;
        padding: 1rem 1.5rem;
        color: white;
        font-size: 1.2rem;
        border: 1px solid var(--gray);
        background: #f64900;
        border-radius: 0.5rem;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .peopleComments {
      font-size: 1.4rem;

      li {
        margin: 2rem;

        .user {
          display: flex;
          align-items: center;
          img {
            border-radius: 100%;
          }
          h4 {
            margin: 1rem;
          }
        }

        p {
          font-size: 1.4rem;
          color: var(--font-primary-color);
          margin-left: 1rem;
        }
      }
    }
  }
`;

export default Product;
