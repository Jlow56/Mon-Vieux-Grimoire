import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../lib/customHooks';
import styles from './Book.module.css';
import { getBook, deleteBook } from '../../lib/common';
import BookInfo from '../../components/Books/BookInfo/BookInfo';
import BookRatingForm from '../../components/Books/BookRatingForm/BookRatingForm';
import BookDeleteImage from '../../images/book_delete.png';
import BestRatedBooks from '../../components/Books/BestRatedBooks/BestRatedBooks';
import BackArrow from '../../components/BackArrow/BackArrow';

function Book() {
  const { connectedUser, userLoading } = useUser();

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [userRated, setUserRated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function loadBook() {
      const data = await getBook(id);
      if (data) setBook(data);
      setLoading(false);
    }
    loadBook();
  }, [id]);

  useEffect(() => {
    if (!userLoading && connectedUser && book?.ratings) {
      const rate = book.ratings.find(
        (elt) => elt.userId === connectedUser.userId,
      );

      if (rate) {
        setUserRated(true);
        setRating(parseInt(rate.grade, 10));
      } else {
        setUserRated(false);
        setRating(0);
      }
    }
  }, [book, userLoading, connectedUser]);

  const onDelete = async (e) => {
    if (e?.key && e.key !== 'Enter') return;

    const del = await deleteBook(book.id);

    if (del) {
      setBook((prev) => ({ ...prev, delete: true }));
    }
  };

  if (loading) return <h1>Chargement...</h1>;

  if (book?.delete) {
    return (
      <div className={styles.Deleted}>
        <h1>{book.title}</h1>
        <p>a bien été supprimé</p>
        <img src={BookDeleteImage} alt="book deleted" />
        <Link to="/">
          <button type="button">Retour à l'accueil</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="content-container">
      <BackArrow />

      <div className={styles.BookContainer}>
        <div className={styles.Book}>
          <div
            className={styles.BookImage}
            style={{ backgroundImage: `url("${book.imageUrl}")` }}
          />

          <div className={styles.BookContent}>
            {book?.userId === connectedUser?.userId && (
              <div className={styles.Owner}>
                <p>Vous avez publié cet ouvrage :</p>
                <p>
                  <Link to={`/livre/modifier/${book.id}`}>modifier</Link>

                  <span
                    role="button"
                    tabIndex={0}
                    onClick={onDelete}
                    onKeyDown={(e) => e.key === 'Enter' && onDelete(e)}
                  >
                    supprimer
                  </span>
                </p>
              </div>
            )}

            <BookInfo book={book} />

            <BookRatingForm
              userRated={userRated}
              userId={connectedUser?.userId}
              rating={rating}
              setRating={setRating}
              setBook={setBook}
              id={book.id}
            />
          </div>
        </div>

        <hr />
        <BestRatedBooks />
      </div>
    </div>
  );
}

export default Book;