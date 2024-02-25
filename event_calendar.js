let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const dayElement = document.querySelector(".calendar-dates");
const currentDateElement = document.querySelector(".calendar-current-date");
const prevNextIcons = document.querySelectorAll(".calendar-navigation span");
const eventListElement = document.querySelector(".event-list"); // Replace with the actual selector for your events container

// Array of month names
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Events data structure
const eventsData = {
    "2024": { // Assuming the year 2024 for demonstration; you might want to make this dynamic
        "January": [
            { date: "2024-02-08", title: "Gin Dinner", place: "Table36", description: "Description of Event A", imageUrl: "path/to/imageA.jpg", color: "#DAAAAF" },
            { date: "2024-02-16", title: "Violin Dinner at the Chapel", place: "Table36", description: "Description of Event B", imageUrl: "path/to/imageA.jpg", color: "#CEDAAA" },
            { date: "2024-02-21", title: "Zouk & Kizomba Night", place: "Table36", description: "Description of Event C", imageUrl: "path/to/imageA.jpg", color: "#CCFFCC" },
            { date: "2024-02-22", title: "Drag Queen Show Vol.1", place: "Table36", description: "Description of Event D", imageUrl: "path/to/imageA.jpg", color: "#CCFFCC" },
            { date: "2024-02-28", title: "Salsa Night", place: "Table36", description: "Description of Event E", imageUrl: "path/to/imageA.jpg", color: "#D18ED0" }
        ],
        "February": [
            { date: "2024-02-08", title: "Gin Dinner", place: "Table36", description: "18:30 - 21:00 | JPY23,000", imageUrl: "Gin Dinner FEB.jpg", color: "#a3d8c9" },
            { date: "2024-02-16", title: "Violin Dinner at the Chapel", place: "Chapel Jour", description: "18:30 - 22:00 | JPY22,000", imageUrl: "Violin Dinner - Valentin v1.jpg", color: "#d5d8a3" },
            { date: "2024-02-21", title: "Zouk & Kizomba Night", place: "Nambar10", description: "19:00 - 23:00| 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Zouk_Kizomba_Flyer_March.jpg", color: "#d8a3a3" },
            { date: "2024-02-22", title: "Drag Queen Show", place: "Nambar10", description: "20:00 - 23:00 | Drag Show & DJ Party | Free Entry", imageUrl: "Drag Queen Party v1.jpg", color: "#d8a3d1" },
            { date: "2024-02-28", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event March2024.jpg", color: "#a3bfd8" }
        ],
        "March": [
            { date: "2024-03-01", title: "Hawaiian Night", place: "Table36", description: "20:00 - 22:30 | Nathan Kanae Exclusive Ukelele Performance", imageUrl: "Hawaiian Night.jpg", color: "#a3d8c9" },
            { date: "2024-03-15", title: "SUNTORY Whisky Dinner", place: "Minami", description: "18:30 - 21:00 | JPY25,000", imageUrl: "Whisky Dinner V1.jpg", color: "#a3b2d8" },
            { date: "2024-03-13", title: "Zouk & Kizomba Night", place: "Nambar10", description: "19:00 - 23:00| 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Zouk_Kizomba_Flyer_March.jpg", color: "#d8a3a3" },
            { date: "2024-03-18", title: "Kiwi Aussie Mixer", place: "Nambar10", description: "19:00 - 21:00 | Free Flow Food & Drinks | JPY5,000", imageUrl: "Cat no flyer.jpg", color: "#b8d8a3" },
            { date: "2024-03-23", title: "Drag Queen Show", place: "Nambar10", description: "20:00 - 23:00 | Drag Show & DJ Party | Free Entry", imageUrl: "Drag Queen Party vol2.jpg", color: "#d8a3d1" },
            { date: "2024-03-27", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event March2024.jpg", color: "#a3bfd8" },
            { date: "2024-03-27", title: "Dinner Dance", place: "Table36", description: "20:45 - 23:00 | The Brown Eyed Katz Band Exclusive Performance", imageUrl: "Cat coming soon 2.jpg", color: "#d8c4a3" }
        ],
        "April": [
            { date: "2024-04-05", title: "Spring Pink Bubbles", place: "SHUN", description: "18:30 - 21:00 | JPY22,000", imageUrl: "Cat coming soon 2.jpg", color: "#a3b2d8" },
            { date: "2024-04-17", title: "Zouk & Kizomba Night", place: "Nambar10", description: "19:00 - 23:00| 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Zouk_Kizomba_Flyer_April.jpg", color: "#d8a3a3" },
            { date: "2024-04-01", title: "Match Making Party", place: "Nambar10", description: "TBD| ", imageUrl: "Cat coming soon 2.jpg", color: "#b8d8a3" },
            { date: "2024-04-01", title: "Drag Queen Show", place: "Nambar10", description: "TBD| 20:00 - 23:00 | Drag Show & DJ Party | Free Entry", imageUrl: "Cat coming soon 2.jpg", color: "#d8a3d1" },
            { date: "2024-04-26", title: "Violin Dinner at the Chapel", place: "Chapel Jour", description: "18:30 - 22:00 | JPY22,000", imageUrl: "Cat coming soon 2.jpg", color: "#d5d8a3" },
            { date: "2024-04-27", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event April2024.jpg", color: "#a3bfd8" }
        ]
    }
};


// Function to generate events
const generateEvents = (year, month) => {
    const monthName = months[month];
    const eventsForMonth = eventsData[year]?.[monthName] || [];

    const eventsHTML = eventsForMonth.map(event => {
        return `<li class="event-item" style="background-color: ${event.color};">
                    <div class="event-summary">
                        <div class="event-title">
                            <h4>${event.title}</h4>
                        </div>
                        <div class="event-info">
                            <p>${event.place}</p>
                            <p>${event.date}</p>
                        </div>
                    </div>
                    <div class="event-details" style="display: none;">
                        <p>${event.description}</p>
                        <img src="${event.imageUrl}" alt="${event.title}" class="event-image">
                    </div>
                </li>`;
    }).join('');

    eventListElement.innerHTML = eventsHTML;

    // Add click event listeners to toggle event details
    document.querySelectorAll('.event-item').forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.event-details');
            const isVisible = details.style.display === 'block';
            details.style.display = isVisible ? 'none' : 'block'; // Toggle visibility
        });
    });
};



// Function to generate the calendar
const generateCalendar = (year, month) => {
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfPreviousMonth = new Date(year, month, 0).getDate();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDayOfMonth = new Date(year, month + 1, 0).getDay();

    let calendarHTML = "";
    let today = new Date();

    // Determine the number of days from the previous month to display
    let emptyCells = firstDayOfMonth;

    // Calculate and display the days from the previous month
    for (let i = 0; i < emptyCells; i++) {
        // This will get the correct date for the days from the previous month
        let prevMonthDay = lastDateOfPreviousMonth - emptyCells + 1 + i;
        calendarHTML += `<li class="inactive" style="opacity: 0.5;">${prevMonthDay}</li>`;
    }

    // Fill in the days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        let date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let eventForDay = Object.values(eventsData[year]?.[months[month]] || []).find(event => event.date === date);
        let dayStyle = isToday ? `style="background-color: #FFD700; border-radius: 50%;"` : eventForDay ? `style="background-color: ${eventForDay.color}; border-radius: 50%;"` : "";

        calendarHTML += `<li ${dayStyle}>${i}</li>`;
    }

    // Determine the number of days to append from the next month
    let daysToAddForNextMonth = 6 - lastDayOfMonth; // Adjust this if your week starts on a different day
    for (let i = 1; i <= daysToAddForNextMonth; i++) {
        calendarHTML += `<li class="inactive" style="opacity: 0.5;">${i}</li>`; // Low opacity for next month's days
    }

    currentDateElement.innerText = `${months[month]} ${year}`;
    dayElement.innerHTML = calendarHTML;
};



// Function to navigate between months
const navigateMonth = (increment) => {
    currentMonth += increment;
    
    if (currentMonth < 0) {
        currentYear--;
        currentMonth = 11;
    } else if (currentMonth > 11) {
        currentYear++;
        currentMonth = 0;
    }

    generateCalendar(currentYear, currentMonth);
    generateEvents(currentYear, currentMonth);
};

// Initial call to populate calendar and events
generateCalendar(currentYear, currentMonth);
generateEvents(currentYear, currentMonth);

// Event listeners for previous and next icons
prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const increment = icon.id === "calendar-prev" ? -1 : 1;
        navigateMonth(increment);
    });
});
