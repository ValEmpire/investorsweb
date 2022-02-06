import React from "react";
import Color from "color";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import Divider from "@mui/material/Divider";
import Box from "@material-ui/core/Box";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    borderColor: "Black",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  card: ({ color }) => ({
    width: 345,
    minWidth: 100,
    margin: "3rem",
    borderRadius: 16,
    boxShadow: "none",

    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  media: {
    height: 140,
  },
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    fontFamily: "Keania One",
    fontSize: "2rem",
    color: "black",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: "Montserrat",
    color: "black",
    opacity: 0.87,
    marginTop: "2rem",
    fontWeight: 500,
    fontSize: 14,
  },
}));

const CustomCard = ({ classes, image, title, subtitle }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={"h2"}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const SolidGameCardDemo = React.memo(function SolidGameCard() {
  const classes = useStyles();
  const gridStyles = useGridStyles();
  const styles = useStyles({ color: "white" });
  const styles2 = useStyles({ color: "white" });
  const styles3 = useStyles({ color: "white" });
  return (
    <>
      <Divider spacing={1}>Most Momentum</Divider>
      <Grid
        container
        spacing={4}
        classeName={classes.gridContainer}
        container
        spacing={4}
        wrap={"nowrap"}
        justify="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            classes={styles}
            title={"Orthopadetics"}
            subtitle={"Future of Joint Replacement"}
            image={"./images/ortho.jpeg"}
            sx={{ borderColor: "text.primary" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            classes={styles2}
            title={"SapientX"}
            subtitle={"A.I. software that give a voice"}
            image={"./images/Sapient.jpeg"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            classes={styles3}
            title={"Fanbase"}
            subtitle={"Monetized Social Media"}
            image={"./images/fanbase.jpeg"}
          />
        </Grid>
      </Grid>

      <Divider spacing={1}>Regulation Crowdfunding Raises*</Divider>
      <Grid classes={gridStyles} container spacing={4} wrap={"nowrap"}>
        <Grid item>
          <CustomCard
            classes={styles}
            title={"Atlas"}
            subtitle={"Auotnomous Solar Fields"}
            image={"./images/Atlas.jpeg"}
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles2}
            title={"FuelGems"}
            subtitle={"A Revoluntionary Fuel Additive"}
            image={"./images/fuel.jpeg"}
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles3}
            title={"YouSolar"}
            subtitle={"Power Your Life.Independently"}
            image={"./images/Solar.jpeg"}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default SolidGameCardDemo;
