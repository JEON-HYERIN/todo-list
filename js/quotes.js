const quotes = [
    {
        quote:"Love does not consist in gazing at each other, but in looking together in the same direction.",
        author:"-Antoine de Saint-Exupery-",
      },
      {
        quote:"It is only with the heart that one can see rightly what is essential is invisible to the eye.",
        author:"-Antoine de Saint-Exupery-",
      },
      {
        quote:"One man with courage makes a majority.",
        author:"-Andrew Jackson-",
      },
      {
        quote:"Like all great travellers, I have seen more than I remember, and remember more than I have seen.",
        author:"-Benjamin Disraeli-",
      },
      {
        quote:"Anything you're good at contributes to happiness.",
        author:"-Bertrand Russell-",
      },
      {
        quote:"Only the person who has faith in himself is able to be faithful to others.",
        author:"-Erich Fromm-",
      },
      {
        quote:"There are two ways of spreading light: to be the candle or the mirror that reflects it.",
        author:"-Edith Wharton-",
      },
      {
        quote:"Although the world is full of suffering, it is full also of the overcoming of it.",
        author:"-Helen Keller-",
      },
      {
        quote:"Every generation laughs at the old fashions but religiously follows the new.",
        author:"-Henry David Thoreau-",
      },
      {
        quote:"Art produces ugly things which frequently become beautiful with time.",
        author:"-Jean Cocteau-",
      }
];

const quote = document.querySelector('.quote span:first-child');
const author = document.querySelector('.quote span:last-child');

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;