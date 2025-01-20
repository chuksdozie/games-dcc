// import {kjv_strong} from './kjv_strong';/

import { kjv } from "@/constants/kjv";

// import kjv from "../constants/kjv";
console.log({ kjv });

export const getBook = () => {
  let books = [];
  kjv.verses.forEach((item, index) => {
    if (!books.includes(item.book_name)) {
      books.push(item.book_name);
    }
  });
  return books;
};

export const getChapters = (bookName) => {
  let chapters = [];
  console.log({ kjvvvv: kjv });

  kjv.verses.forEach((item, index) => {
    if (item.book_name == bookName && !chapters.includes(item.chapter)) {
      chapters.push(item.chapter);
    }
  });
  return chapters;
};

export const getVerses = async (bookName, chapter) => {
  let verses = [];
  // console.log(1234, bookName, chapter);

  kjv.verses.forEach((item, index) => {
    if (
      item.chapter === chapter &&
      item.book_name === bookName &&
      !verses.includes(item.verse)
    ) {
      verses.push(item.verse);
    }
  });
  // console.log(22222, verses);
  return verses;
};

export const getScriptures = (bookName, chapter) => {
  let scriptures = [];

  kjv.verses.forEach((item, index) => {
    if (item.chapter === chapter && item.book_name === bookName) {
      scriptures.push({ text: item.text, num: item.verse });
    }
  });
  // console.log(7765, scriptures[0]);
  return scriptures;
};

export const getSpecificScripture = (bookName, chapter, verse) => {
  let scriptures = [];

  kjv.verses.forEach((item, index) => {
    if (
      item.chapter === chapter &&
      item.book_name === bookName &&
      item.verse === verse
    ) {
      scriptures.push({ text: item.text, num: verse });
    }
  });
  return scriptures;
};

export const getBibleMetadata = (bible) => {
  const name = bible?.metadata?.name;
  const shortname = bible?.metadata?.shortname;
  const year = bible?.metadata?.year;
  const copyright = bible?.metadata?.copyright_statement;

  return { name, shortname, year, copyright };
};
