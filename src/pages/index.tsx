import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [ingredients, setIngredients] = useState<string>("");

  const [response, setResponse] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const queryResponse = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
        }),
      });
      const data = await queryResponse.json();
      setIsLoading(false);

      setResponse(data.choices[0].text);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Chef-GPT 🤖👨‍🍳</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Chef-GPT 🤖👨‍🍳</h1>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              A simple app that uses the GPT-3 API to generate recipes based on
              a list of ingredients.
            </h3>
            <h3 className={styles.cardTitle}>Ingredients</h3>
            <input
              className={styles.textInput}
              onChange={(e) => {
                setIngredients(e.target.value);
              }}
            />
            <button className={styles.loginButton} onClick={fetchRecipe}>
              {isLoading ? "Loading" : "Generate Recipe"}
            </button>
          </div>
          {response && (
            <div className={styles.recipeCard}>
              <h3 className={styles.cardTitle}>Generated Recipe</h3>
              {response
                .split("\n")
                .filter((line) => line !== "")
                .map((line, index) => {
                  return (
                    <p key={index} className={styles.cardText}>
                      {line}
                    </p>
                  );
                })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
