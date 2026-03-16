import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hi, welcome to Azim's website!</h1>
        <p>We're glad to have you here. Explore and enjoy your stay!</p>
      </main>
    </div>
  );
}
