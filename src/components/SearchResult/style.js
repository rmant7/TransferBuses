const resultStyle = {
  lg: {
    inline: {
      display: 'flex',
      flexDirection: "row",
      paddingBottom: 2.5,
      marginLeft: 5,
      color: "#607d8b",
      alignItems: "baseline",
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: 10,
      borderRadius: 5,
      borderColor: "grey",
      borderWidth: 1,
      paddingVertical: 2.5,
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '85%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingBottom: 10,
    },
    time: {
      color: 'grey',
      marginLeft: 5,
    },
    price: {
      color: "#fff",
      fontWeight: "bold",
    },
    priceContainer: {
      backgroundColor: "#ff6721",
      padding: 3,
      borderRadius: 5,
      display: 'inline-block',
    },
    icon: {
      fontSize: "xx-large",
      margin: "0 2px",
    },
    car: {
      width: 27,
      height: 27,
      margin: "0 2px",
    },
    arrow: {
      fontSize: 'large',
      verticalAlign: "text-bottom",
      margin: "0 2px",
    },
  },
  sm: {
    inline: {
      display: 'flex',
      flexDirection: "row",
      paddingBottom: 2,
      marginLeft: 5,
      color: "#607d8b",
      alignItems: "baseline",
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: 8,
      borderRadius: 5,
      borderColor: "grey",
      borderWidth: 1,
      paddingVertical: 2.5,
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '85%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingBottom: 8,
    },
    time: {
      color: 'grey',
      marginLeft: 5,
      fontSize: "0.8rem",
    },
    price: {
      color: "#fff",
      fontSize: "0.8rem",
    },
    priceContainer: {
      backgroundColor: "#ff6721",
      padding: 3,
      borderRadius: 5,
      display: 'inline-block',
    },
    icon: {
      margin: 0,
    },
    car: {
      width: 22,
      height: 22,
    },
    arrow: {
      fontSize: 'medium',
      verticalAlign: "text-top",
      margin: 0,
    },
  },
};
const resultItemStyle = {
  lg: {
    itemContainer: {
      width: "100%",
      backgroundColor: "rgb(255, 251, 255)",
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: "rgb(119, 87, 80)",
      borderTopStyle: 'solid',
      alignItems: "center",
      justifyContent: "center",
    },
    directions: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 5,
    },
    boldText: {
      fontWeight: "bold",
    },
    buyTicket: {
      borderWidth: 1,
      borderColor: "rgb(177, 44, 22)",
      fontSize: "12px",
      padding: "0 7px",
      margin: "0 5px",
      color: "rgb(177, 44, 22)",
    },
    price: {
      color: "rgb(177, 44, 22)",
    },
    icon: {
      color: "#607d8b",
      verticalAlign: "text-bottom",
    },
    car: {
      zIndex: 100,
      width: 20,
      height: 20,
      alignSelf: "center",
      backgroundColor: "white",
      marginLeft: 5,
      verticalAlign: "text-bottom",
    },
    time: {
      color: 'rgb(119, 87, 80)',
    },
    iconText: {
      textAlign: 'right',
    },
  },
  sm: {
    itemContainer: {
      width: "100%",
      backgroundColor: "rgb(255, 251, 255)",
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: "rgb(119, 87, 80)",
      borderTopStyle: 'solid',
      alignItems: "center",
      justifyContent: "center",
    },
    directions: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 3,
      alignItems: "center",
    },
    boldText: {
      fontWeight: "normal",
    },
    buyTicket: {
      borderWidth: 1,
      borderColor: "rgb(177, 44, 22)",
      fontSize: "10px",
      padding: "0 5px",
      margin: "0 2px",
      color: "rgb(177, 44, 22)",
    },
    price: {
      color: "rgb(177, 44, 22)",
      fontSize: "0.8rem",
    },
    icon: {
      color: "#607d8b",
      verticalAlign: "text-bottom",
    },
    car: {
      zIndex: 100,
      width: 18,
      height: 18,
      alignSelf: "center",
      backgroundColor: "white",
      marginLeft: 5,
      verticalAlign: "text-bottom",
    },
    time: {
      color: 'rgb(119, 87, 80)',
      fontSize: "0.8rem",
    },
    iconText: {
      fontSize: "0.8rem",
      textAlign: 'right',
    },
  },
};
export { resultStyle, resultItemStyle };