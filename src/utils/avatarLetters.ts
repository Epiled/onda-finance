  export const avatarLetters = (name: string) => {
    const names = name.split(" ");

    const firstNameLetter = names[0].charAt(0);
    const lastNameLetter = names[1]?.charAt(0);

    if (!lastNameLetter) {
      return firstNameLetter;
    }

    return firstNameLetter.concat(lastNameLetter).toLocaleUpperCase();
  };