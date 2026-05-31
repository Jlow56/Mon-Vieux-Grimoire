import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { generateStarsInputs } from '../../../lib/functions';
import { useFilePreview } from '../../../lib/customHooks';
import addFileIMG from '../../../images/add_file.png';
import styles from './BookForm.module.css';
import { updateBook, addBook } from '../../../lib/common';

function BookForm({ book, validate }) {
  const userRating = book
    ? book.ratings.find((elt) => elt.userId === localStorage.getItem('userId'))?.grade
    : 0;

  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    watch,
    formState,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({
      title: book?.title,
      author: book?.author,
      year: book?.year,
      genre: book?.genre,
    }), [book]),
  });

  useEffect(() => {
    if (book) reset(book);
  }, [book, reset]);

  const file = watch('file');
  const [filePreview] = useFilePreview(file);

  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  useEffect(() => {
    if (!book && formState.dirtyFields.rating) {
      const rate = document.querySelector('input[name="rating"]:checked')?.value;
      if (rate) setRating(parseInt(rate, 10));
    }
  }, [formState, book]);

  const onSubmit = async (data) => {
    setError('');
    setMessage('');

    if (!book) {
      if (!data.file?.[0]) {
        setError('Vous devez ajouter une image');
        return;
      }

      const payload = {
        ...data,
        rating: data.rating || 0,
      };

      const newBook = await addBook(payload);

      if (!newBook.error) {
        setMessage(newBook.message);
        validate(true);
      } else {
        setError(newBook.message);
      }
    } else {
      const updatedBook = await updateBook(data, data.id);

      if (!updatedBook.error) {
        navigate('/');
      } else {
        setError(updatedBook.message);
      }
    }
  };

  const idReg = register('id');
  const titleReg = register('title');
  const authorReg = register('author');
  const yearReg = register('year');
  const genreReg = register('genre');
  const fileReg = register('file');

  const readOnlyStars = !!book;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>

      <input type="hidden" id="id" name={idReg.name} ref={idReg.ref} onChange={idReg.onChange} onBlur={idReg.onBlur} />

      {error && <p className={styles.Error}>{error}</p>}
      {message && <p className={styles.Message}>{message}</p>}

      <label htmlFor="title">
        <p>Titre du livre</p>
        <input type="text" id="title" name={titleReg.name} ref={titleReg.ref} onChange={titleReg.onChange} onBlur={titleReg.onBlur} />
      </label>

      <label htmlFor="author">
        <p>Auteur</p>
        <input type="text" id="author" name={authorReg.name} ref={authorReg.ref} onChange={authorReg.onChange} onBlur={authorReg.onBlur} />
      </label>

      <label htmlFor="year">
        <p>Année de publication</p>
        <input type="text" id="year" name={yearReg.name} ref={yearReg.ref} onChange={yearReg.onChange} onBlur={yearReg.onBlur} />
      </label>

      <label htmlFor="genre">
        <p>Genre</p>
        <input type="text" id="genre" name={genreReg.name} ref={genreReg.ref} onChange={genreReg.onChange} onBlur={genreReg.onBlur} />
      </label>

      <label htmlFor="rate">
        <p>Note</p>
        <div className={styles.Stars}>
          {generateStarsInputs(rating, register, readOnlyStars)}
        </div>
      </label>

      <label htmlFor="file">
        <p>Visuel</p>
        <div className={styles.AddImage}>
          {filePreview || book?.imageUrl ? (
            <>
              <img src={filePreview ?? book?.imageUrl} alt="preview" />
              <p>Modifier</p>
            </>
          ) : (
            <>
              <img src={addFileIMG} alt="Add file" />
              <p>Ajouter une image</p>
            </>
          )}
        </div>
        <input type="file" id="file" name={fileReg.name} ref={fileReg.ref} onChange={fileReg.onChange} onBlur={fileReg.onBlur} />
      </label>

      <button type="submit">Publier</button>
    </form>
  );
}

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    imageUrl: PropTypes.string,
    genre: PropTypes.string,
    ratings: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        grade: PropTypes.number,
      }),
    ),
    averageRating: PropTypes.number,
  }),
  validate: PropTypes.func,
};

BookForm.defaultProps = {
  book: null,
  validate: null,
};

export default BookForm;
