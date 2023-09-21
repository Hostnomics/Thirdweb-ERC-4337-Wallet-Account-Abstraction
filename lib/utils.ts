import {useState} from 'react'

//Addy Shortner
export const addressShortener = (address: string): string => {
    const stringAddy = String(address);
    const shortenedAddy = stringAddy.substring(0, 6) + '...' + stringAddy.substring(37);
    return shortenedAddy;
};

//Two Digit Year
export const formatDateTwoDigitYear = (date: string): string => {
    // Assuming the date value is received as a string from the input field dateValue = '2023-05-19';
    const dateValue = String(date);   
    // Split the date value by the hyphen
    const [year, month, day] = dateValue.split('-');   
    // Create a new Date object using the extracted values
    const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));   
    // Format the date as mm/dd/YY
    const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear().toString().slice(-2)}`;
    return formattedDateString; // Output: 05/19/23
};


export const formatDateFourDigitYear = (date: string): string => {
    // Assuming the date value is received as a string from the input field dateValue = '2023-05-19';
    const dateValue = String(date);     
    // Split the date value by the hyphen
    const [year, month, day] = dateValue.split('-');     
    // Create a new Date object using the extracted values
    const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));     
    // Format the date as mm/dd/YY
    const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
    return formattedDateString; // Output: 05/19/23
  };

// Add for uint256 dates from solidity coming in as bigNumber:
export const convertBigNumberToFourDigitYear = (bigNumberDate: string | number): string => {
    const dateNumber = typeof bigNumberDate === 'string' ? parseInt(bigNumberDate) : bigNumberDate;
    const date = new Date(dateNumber);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');

    const dateString = year + '-' + month + '-' + day;
    return formatDateFourDigitYear(dateString);
};


