import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = ({ body }) => (
  <Html>
    <Head />
    <Preview>Elmentor Courses</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <div style={styles.centered}>
          <Img
            width="135px"
            src="https://res.cloudinary.com/dahptqhed/image/upload/v1729065688/almentor_owler_20210531_111400_original_c7bdb05f44.png"
            alt="Almentor Logo"
            style={styles.logo}
          />
        </div>
        <div style={styles.mainDiv}>
          <p style={styles.benefit}>
            The benefits of lifelong <span style={styles.red}>learning</span>
          </p>
          <p style={styles.description}>
            Committing to learning can be a challenge — especially when life
            gets busy. But it’s worth it. Even just 20 minutes a week can help
            you.
          </p>
        </div>
        <Hr style={styles.hr} />
        <div style={styles.section}>
          <div>
            <p style={styles.num}>1</p>
          </div>
          <div>
            <h2 style={styles.txt}>Advance in your career.</h2>
            <p>
              Learning can help you land that promotion or even break into a
              whole new field.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div>
            <p style={styles.num}>2</p>
          </div>
          <div>
            <h2 style={styles.txt}>Get a confidence boost.</h2>
            <p>
              Developing new or existing skills can make you more comfortable at
              work and in life.
            </p>
          </div>
        </div>
        <div style={styles.section}>
          <div>
            <p style={styles.num}>3</p>
          </div>
          <div>
            <h2 style={styles.txt}>Feel fulfilled.</h2>
            <p>
              Whether you’re learning something new or deepening an existing
              skill, learning feels good.
            </p>
          </div>
        </div>
        <div style={styles.course}>
          <button style={styles.btn}>
            <a href="http://localhost:3000/courses" style={styles.link}>
              Browse Courses
            </a>
          </button>
        </div>
        <div style={styles.title}>
          <p>Courses in Your Shopping Cart:</p>
        </div>
        <div style={styles.list}>
          {body.cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <Img
                src={
                  item?.serviceDetail?.attributes?.image?.data?.attributes
                    ?.url || ""
                }
                alt={item?.serviceDetail?.attributes?.name || "Service Image"}
                width="70"
                height="70"
                style={styles.logo}
              />
              <div style={styles.left}>
                <h2 style={styles.btm}>
                  {item?.serviceDetail?.attributes?.name || "N/A"}
                </h2>
                <div style={styles.center}>
                  {/* Replace with star images if needed */}
                  <span style={styles.yellow}>★★★★☆</span>
                  <span style={styles.score}>4.68</span>
                  <span style={styles.student}>(41,289)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Hr style={styles.hr} />
        <Text style={styles.footer}>
          Thanks for Subscribing! &copy; 2024. Almentor.net. All rights
        </Text>
      </Container>
    </Body>
  </Html>
);

const styles = {
  main: { backgroundColor: "#f6f6f6", fontFamily: "Arial, sans-serif" },
  container: {
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    maxWidth: "600px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  logo: { borderRadius: "8px", backgroundColor: "white" },
  hr: { borderTop: "1px solid #eeeeee", margin: "20px 0" },
  footer: { textAlign: "center", color: "#888888", fontSize: "14px" },
  centered: { textAlign: "center" },
  mainDiv: { margin: "10px 0" },
  benefit: { fontSize: "40px", color: "#1b1f1f", fontFamily: "auto" },
  description: { fontSize: "16px", color: "#555555" },
  course: { textAlign: "center", margin: "15px 0" },
  score: {
    marginLeft: "3px",
    color: "dimgrey",
  },
  student: {
    marginLeft: "3px",
  },
  btn: {
    backgroundColor: "#ff0017",
    color: "white",
    padding: "10px 20px",
    border: "none",
  },
  list: { margin: "10px 0" },
  cartItem: { display: "flex", alignItems: "start", marginBottom: "10px" },
  left: { marginLeft: "10px" },
  red: { color: "#ff0017" },
  center: {
    textAlign: "start",
    alignItems: "start",
  },
  yellow: { fill: "#f5c252", color: "#f5c252" },
  title: { fontSize: "17px", margin: "10px 0" },
  btm: {
    marginBottom: "3px",
    fontSize: "16px",
    fontWeight: "normal",
    marginTop: "0",
  },
  section: { display: "flex", alignItems: "center", margin: "10px 0" },
  num: {
    color: "#ff0017",
    fontSize: "34px",
    fontWeight: "bolder",
    marginRight: "30px",
  },
  txt: { fontWeight: "bold", fontSize: "20px", color: "#1b1f1f" },
};
