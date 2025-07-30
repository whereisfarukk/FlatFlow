export const currentUser = {
    id: "1",
    name: "Admin User",
    role: "admin",
    email: "admin@example.com",
};

export const apartments = [
    // Floors 1 & 2 combined
    { id: "1", number: "02A", ownerName: "John Doe", ownerEmail: "john@example.com" },

    // Floor 3
    { id: "2", number: "03A", ownerName: "Jane Smith", ownerEmail: "jane@example.com" },
    { id: "3", number: "03B", ownerName: "Mike Johnson", ownerEmail: "mike@example.com" },
    { id: "4", number: "03C", ownerName: "Sarah Wilson", ownerEmail: "sarah@example.com" },

    // Floor 4
    { id: "5", number: "04A", ownerName: "David Brown", ownerEmail: "david@example.com" },
    { id: "6", number: "04B", ownerName: "Lisa Davis", ownerEmail: "lisa@example.com" },
    { id: "7", number: "04C", ownerName: "James Miller", ownerEmail: "james@example.com" },

    // Floor 5
    { id: "8", number: "05A", ownerName: "Patricia Hall", ownerEmail: "patricia@example.com" },
    { id: "9", number: "05B", ownerName: "Robert Wilson", ownerEmail: "robert@example.com" },
    { id: "10", number: "05C", ownerName: "Linda Moore", ownerEmail: "linda@example.com" },

    // Floor 6
    { id: "11", number: "06A", ownerName: "William Taylor", ownerEmail: "william@example.com" },
    { id: "12", number: "06B", ownerName: "Elizabeth Anderson", ownerEmail: "elizabeth@example.com" },
    { id: "13", number: "06C", ownerName: "Richard Thomas", ownerEmail: "richard@example.com" },

    // Floor 7
    { id: "14", number: "07A", ownerName: "Jennifer Jackson", ownerEmail: "jennifer@example.com" },
    { id: "15", number: "07B", ownerName: "Charles White", ownerEmail: "charles@example.com" },
    { id: "16", number: "07C", ownerName: "Maria Garcia", ownerEmail: "maria@example.com" },

    // Floor 8
    { id: "17", number: "08A", ownerName: "Joseph Martinez", ownerEmail: "joseph@example.com" },
    { id: "18", number: "08B", ownerName: "Barbara Robinson", ownerEmail: "barbara@example.com" },
    { id: "19", number: "08C", ownerName: "Thomas Clark", ownerEmail: "thomas@example.com" },

    // Floor 9
    { id: "20", number: "09A", ownerName: "Cynthia Rodriguez", ownerEmail: "cynthia@example.com" },
    { id: "21", number: "09B", ownerName: "Christopher Lewis", ownerEmail: "christopher@example.com" },
    { id: "22", number: "09C", ownerName: "Karen Lee", ownerEmail: "karen@example.com" },

    // Floor 10
    { id: "23", number: "10A", ownerName: "Kevin Walker", ownerEmail: "kevin@example.com" },
    { id: "24", number: "10B", ownerName: "Nancy Hall", ownerEmail: "nancy@example.com" },
    { id: "25", number: "10C", ownerName: "Brian Allen", ownerEmail: "brian@example.com" },

    // Floor 11
    { id: "26", number: "11A", ownerName: "Helen Young", ownerEmail: "helen@example.com" },
    { id: "27", number: "11B", ownerName: "Daniel Hernandez", ownerEmail: "daniel@example.com" },
    { id: "28", number: "11C", ownerName: "Sandra King", ownerEmail: "sandra@example.com" },

    // Floor 12
    { id: "29", number: "12A", ownerName: "Matthew Wright", ownerEmail: "matthew@example.com" },
    { id: "30", number: "12B", ownerName: "Ashley Lopez", ownerEmail: "ashley@example.com" },
    { id: "31", number: "12C", ownerName: "Timothy Hill", ownerEmail: "timothy@example.com" },
];
export const bills = [
    {
        id: "1",
        apartmentNumber: "101",
        month: "January",
        year: 2024,
        amount: 2750.5,
        dueDate: "2024-02-15",
        isPaid: true,
        paidDate: "2024-02-10",
    },
    {
        id: "2",
        apartmentNumber: "102",
        month: "January",
        year: 2024,
        amount: 2850.75,
        dueDate: "2024-02-15",
        isPaid: false,
        paidDate: null,
    },
    {
        id: "3",
        apartmentNumber: "201",
        month: "January",
        year: 2024,
        amount: 2950.0,
        dueDate: "2024-02-15",
        isPaid: true,
        paidDate: "2024-02-12",
    },
    {
        id: "4",
        apartmentNumber: "202",
        month: "January",
        year: 2024,
        amount: 2800.25,
        dueDate: "2024-02-15",
        isPaid: false,
        paidDate: null,
    },
    {
        id: "5",
        apartmentNumber: "301",
        month: "February",
        year: 2024,
        amount: 3100.0,
        dueDate: "2024-03-15",
        isPaid: true,
        paidDate: "2024-03-08",
    },
    {
        id: "6",
        apartmentNumber: "302",
        month: "February",
        year: 2024,
        amount: 2900.5,
        dueDate: "2024-03-15",
        isPaid: false,
        paidDate: null,
    },
];
