import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  root: {
    backgroundColor: "var(--primary-bright)",
    color: "var(--primary-dark)",
    "&:hover": {
      backgroundColor: "var(--primary)",
    },

    boxShadow: "-1px 2px 2px 0px var(--primary-bright)",
  },
});
