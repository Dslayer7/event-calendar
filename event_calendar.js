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
                       
            { date: "2024-01-24", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event March2024.jpg", color: "#a3bfd8" },
            { date: "2024-03-15", title: "SUNTORY Wine Dinner", place: "Shun", description: "18:30 - 21:00 | JPY25,000", imageUrl: "Suntory Wine Dinner v1.jpg", color: "#a3d8c9" },
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
            { date: "2024-03-20", title: "Zouk & Kizomba Night", place: "Nambar10", description: "19:00 - 23:00| 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Zouk_Kizomba_Flyer_March.jpg", color: "#d8a3a3" },
            { date: "2024-03-23", title: "Drag Queen Show", place: "Nambar10", description: "20:00 - 23:00 | Drag Show & DJ Party | Free Entry", imageUrl: "Drag Queen Party vol2.jpg", color: "#d8a3d1" },
            { date: "2024-03-27", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event March2024.jpg", color: "#a3bfd8" },
            { date: "2024-03-27", title: "Dinner Dance", place: "Table36", description: "20:45 - 23:00 | The Brown Eyed Katz Band Exclusive Performance", imageUrl: "Cat coming soon 2.jpg", color: "#d8c4a3" }
        ],
        "April": [
            { date: "2024-04-12", title: "Errazuriz Wine Dinner", place: "SHUN", description: "18:30 - 21:00 | JPY23,000", imageUrl: "Cat coming soon 2.jpg", color: "#a3b2d8" },
            { date: "2024-04-13", title: "Errazuriz Wine Dinner", place: "SHUN", description: "18:30 - 21:00 | JPY23,000", imageUrl: "Cat coming soon 2.jpg", color: "#a3b2d8" },
            { date: "2024-04-17", title: "Zouk & Kizomba Night", place: "Nambar10", description: "19:00 - 23:00| 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Zouk_Kizomba_Flyer_April.jpg", color: "#d8a3a3" },
            { date: "2024-04-01", title: "Match Making Party", place: "Nambar10", description: "TBD| ", imageUrl: "Cat coming soon 2.jpg", color: "#b8d8a3" },
            { date: "2024-04-01", title: "Drag Queen Show", place: "Nambar10", description: "TBD| 20:00 - 23:00 | Drag Show & DJ Party | Free Entry", imageUrl: "Cat coming soon 2.jpg", color: "#d8a3d1" },
            { date: "2024-04-26", title: "Violin Dinner at the Chapel", place: "Chapel Jour", description: "18:30 - 22:00 | JPY22,000", imageUrl: "Cat coming soon 2.jpg", color: "#d5d8a3" },
            { date: "2024-04-27", title: "Salsa Night", place: "Table36", description: "TheLounge: Salsa Lesson (19:00 - 20:00) | Table36: Salsa Party (20:00 - 23:00) | 2 Drinks, Lesson and Party | JPY3,000", imageUrl: "Salsa Event April2024.jpg", color: "#a3bfd8" }
        ]
    }
};


const generateEvents = (year, month) => {
    const monthName = months[month];
    const eventsForMonth = eventsData[year]?.[monthName] || [];

    const eventsHTML = eventsForMonth.map(event => {
        // Use replace with a global regex for compatibility
        const eventId = `event-${event.date.replace(/-/g, '_')}`; // Ensure this matches the format used in the calendar
        return `<li id="${eventId}" class="event-item" style="background-color: ${event.color};">
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
        let prevMonthDay = lastDateOfPreviousMonth - emptyCells + 1 + i;
        calendarHTML += `<li class="inactive" style="opacity: 0.5;">${prevMonthDay}</li>`;
    }

    // Fill in the days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let isToday = dateString === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        let eventForDay = eventsData[currentYear]?.[months[month]]?.find(event => event.date === dateString);
        let eventId = eventForDay ? `event-${eventForDay.date.replaceAll('-', '_')}` : null;
        let dayClass = isToday ? "active" : eventForDay ? "has-event" : "";
        let dayStyle = isToday ? `style="background-color: #FFD700; border-radius: 50%;"` : eventForDay ? `style="background-color: ${eventForDay.color}; border-radius: 50%;"` : "";
        let dataEventId = eventForDay ? `data-event-id="event-${eventForDay.date.replaceAll('-', '_')}"` : "";
        let dayHtml = eventId ? `<li class="${isToday ? 'active ' : ''}has-event" data-event-id="${eventId}">${i}</li>` : `<li class="${isToday ? 'active' : ''}">${i}</li>`;
        
        calendarHTML += `<li class="${dayClass}" ${dayStyle} ${dataEventId ? `data-event-id="${eventId}"` : ''}>${i}</li>`;
    }

    // Determine the number of days to append from the next month
    let daysToAddForNextMonth = 6 - lastDayOfMonth;
    for (let i = 1; i <= daysToAddForNextMonth; i++) {
        calendarHTML += `<li class="inactive" style="opacity: 0.5;">${i}</li>`;
    }

    currentDateElement.innerText = `${months[month]} ${year}`;
    dayElement.innerHTML = calendarHTML;

    // Attach event listeners for days with events
    // Attach event listeners for days with events
document.querySelectorAll('.calendar-dates li.has-event').forEach(element => {
    element.addEventListener('click', function() {
        const eventId = this.getAttribute('data-event-id');
        const eventElement = document.getElementById(eventId);
        if (eventElement) {
            // Scroll to the event element
            eventElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Automatically open the event details
            const eventDetails = eventElement.querySelector('.event-details');
            if (eventDetails && eventDetails.style.display === 'none') {
                eventDetails.style.display = 'block';
            } else {
                // If you want to toggle the details visibility on click, uncomment the next line
                // eventDetails.style.display = 'none';
            }
        }
    });
});    
  
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

// Variables to store touch start and end positions
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function checkSwipeDirection() {
    // Calculate the differences between start and end positions
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
            // Swiped left, show next month
            navigateMonth(1);
        } else {
            // Swiped right, show previous month
            navigateMonth(-1);
        }
    }
    // If the swipe is more vertical than horizontal, do nothing (allow scrolling)
}

// Add event listeners for touch start and end
const calendar = document.querySelector('.calendar-container');
calendar.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);

calendar.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    checkSwipeDirection();
}, false);
