export const fetchUsers = async (requestFriendEmail) => {
    try {
        const response = await fetch('https://casset-tq1k.onrender.com/users/searchUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": requestFriendEmail }), 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const foundUser = await response.json();
        return foundUser;
    } catch (error) {
        console.log(error);
    }
};
