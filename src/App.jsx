// import './App.css'

import CategoryBook from "./components/CatygoryBook";

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App



const App = () => {
  const books = [
    {
      image: "https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286",
      title: "История книги",
      description:
        "Предлагаемый перевод является первой попыткой обращения к творчеству Павла Орозия — римского христианского историка начала V века...",
      price: 456,
      category: "Бизнес-литература",
    },
    {
      image: "https://example.com/otherbook.jpg",
      title: "Детские книги 1",
      description: "Описание книги для детей.",
      price: 350,
      category: "Детские книги",
    },
    {
      image: "https://example.com/otherbook2.jpg",
      title: "Хобби и досуг",
      description: "Описание книги о хобби.",
      price: 500,
      category: "Хобби и досуг",
    },
    // Add more book objects as needed
  ];

  return (
    <div>
      <CategoryBook books={books} />
    </div>
  );
};

export default App;
