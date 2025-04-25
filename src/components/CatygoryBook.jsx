import { useState } from "react";
import { Box, Link, Typography, styled } from "@mui/material";
import Button from "./UI/buttons/Button";
import bgOrange from "../assets/images/pngs/bgOrange.png";

const categoriesData = [
  {
    id: 1,
    name: "Бизнес-литература",
    image: "https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286",
    title: "История бизнеса",
    description:
      "Книга рассказывает об истории предпринимательства и современных тенденциях в бизнесе...",
    price: "456 c",
  },
  {
    id: 2,
    name: "Детские книги",
    image: "https://covers.openlibrary.org/b/id/8235116-L.jpg",
    title: "Сказки на ночь",
    description:
      "Замечательные сказки для малышей, развивающие воображение и чувство доброты...",
    price: "320 c",
  },
  // Добавь другие категории по аналогии
];

const CategoryBook = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);

  return (
    <StyledCont>
      <StyledBox>
        <Typography variant="h4">Последние публикации</Typography>
        <Button variant="notbor">Смотреть все</Button>
      </StyledBox>

      <MainContent>
        <CategoryList>
          {categoriesData.map((category) => (
            <CategoryItem
              key={category.id}
              active={selectedCategory.id === category.id}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </CategoryItem>
          ))}
        </CategoryList>

        <StyledBoxImage>
          <img src={selectedCategory.image} alt={selectedCategory.title} />
        </StyledBoxImage>

        <BookDetails>
          <Typography variant="h6">{selectedCategory.title}</Typography>
          <Typography>{selectedCategory.description}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <button>Подробнее</button>
            <Typography>{selectedCategory.price}</Typography>
          </Box>
        </BookDetails>
      </MainContent>
    </StyledCont>
  );
};

export default CategoryBook;

const StyledCont = styled(Box)({
  padding: "150px 80px",
  backgroundColor: "#1c1c1c",
  color: "#fff",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 32,
});

const MainContent = styled(Box)({
  display: "flex",
  gap: 40,
});

const CategoryList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const CategoryItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  color: active ? "#fff" : "#aaa",
  fontWeight: active ? 600 : 400,
  cursor: "pointer",
  textDecoration: "none",
  position: "relative",
  display: "inline-block",
  padding: "8px 0",
  transition: "all 0.3s ease",
  transform: active ? "translateX(15px)" : "translateX(0)",

  "&::before": active
    ? {
        content: '""',
        position: "absolute",
        left: "-30px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "30px",
        height: "1px",
        backgroundColor: "#fff",
      }
    : {},
}));

const StyledBoxImage = styled(Box)({
  backgroundImage: `url(${bgOrange})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: 400,
  height: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& img": {
    width: "80%",
    height: "auto",
    objectFit: "cover",
  },
});

const BookDetails = styled(Box)({
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  gap: 16,
});
