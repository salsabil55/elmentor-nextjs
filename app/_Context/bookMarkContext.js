// import { createContext } from "react";
// export const BookMarkContext = createContext(null);

import { createContext, useContext, useEffect, useState } from "react";

const BookedContext = createContext();

export const useBooked = () => useContext(BookedContext);

export const BookedProvider = ({ children }) => {
  const [bookedItems, setBookedItems] = useState([]);

  const addBookedItem = (newItem) => {
    setBookedItems((prevItems) => {
      // Prevent adding duplicate items
      if (prevItems.some((item) => item.id === newItem.id)) {
        console.log("Item already booked:", newItem);
        return prevItems;
      }
      return [...prevItems, newItem]; // Add new item
    });
  };

  const removeBookedItem = (id) => {
    setBookedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleBookedItem = (item) => {
    setBookedItems((prevItems) => {
      if (prevItems.some((i) => i.id === item.id)) {
        // If the item is already booked, remove it
        return prevItems.filter((i) => i.id !== item.id);
      } else {
        // If the item is not booked, add it
        return [...prevItems, item];
      }
    });
  };

  return (
    <BookedContext.Provider
      value={{ bookedItems, addBookedItem, removeBookedItem, toggleBookedItem }}
    >
      {children}
    </BookedContext.Provider>
  );
};
