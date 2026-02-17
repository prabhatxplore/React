import { useState } from "react";
import MyButton from "./components/MyButton";
function App() {
  const [count, setCount] = useState(0);
  const user = {
    name: "Hedy Lamarr",
    imageUrl: null,
    imageSize: 90,
  };
  const products = [
    { title: "Cabbage", id: 1 },
    { title: "Garlic", id: 2 },
    { title: "Apple", id: 3 },
  ];

  const listItems = products.map((product) => (
    <li key={product.id}>{product.title}</li>
  ));
  return (
    <>
      <div className="text-center">
        <h1>Welcome to my app</h1>
        <MyButton count={count} setCount={setCount} />
        <MyButton count={count} setCount={setCount} />
      </div>
      <div>
        <h1>{user.name}</h1>
        <img
          src={user.imageUrl}
          alt={"Photo of " + user.name}
          style={{ width: user.imageSize, height: user.imageSize }}
        />
      </div>
    </>
  );
}

export default App;
