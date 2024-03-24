let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let eventsDataGlobal = null; // Global variable to store event data

const dayElement = document.querySelector(".calendar-dates");
const currentDateElement = document.querySelector(".calendar-current-date");
const prevNextIcons = document.querySelectorAll(".calendar-navigation span");
const eventListElement = document.querySelector(".event-list"); // Replace with the actual selector for your events container

const langResources = {
    en: {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        title: "Events and Promotions Calendar"
        // Add other texts as needed
    },
    ja: {
        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        weekdays: ["日", "月", "火", "水", "木", "金", "土"],
        title: "イベントとプロモーションのカレンダー"
        // Add translations for other texts
    }
};

function applyLanguage(lang) {
    const resources = langResources[lang] || langResources.en; // Fallback to English
    document.querySelector('.title-container h1').innerText = resources.title;
    document.querySelectorAll('.calendar-weekdays li').forEach((element, index) => {
        element.innerText = resources.weekdays[index];
    });
    // Update other texts similarly
}

async function loadEventsData() {
    const response = await fetch('events.json');
    const data = await response.json();
    eventsDataGlobal = data; // Ensure this assignment occurs
    console.log("Data loaded", eventsDataGlobal);
    return data; // This return is optional since we're using a global variable
}

async function initializeCalendar() {
    await loadEventsData(); // Ensure data is loaded before continuing
    applyLanguage(getCurrentLang());
    generateCalendar(currentYear, currentMonth);
    generateEvents(currentYear, currentMonth);
    setupNavigation();
}


function setupNavigation() {
    console.log('Setting up navigation');
    prevNextIcons.forEach(icon => {
        let newIcon = icon.cloneNode(true); // Clone the node, removing event listeners
        icon.parentNode.replaceChild(newIcon, icon); // Replace the old icon with the new one
        
        console.log(`Adding click listener to ${newIcon.id}`);
        newIcon.addEventListener("click", () => {
            console.log(`Clicked on ${newIcon.id}`);
            const increment = newIcon.id === "calendar-prev" ? -1 : 1;
            navigateMonth(increment); // Use global events data for navigation
        });
    });
}


function getCurrentLang() {
    const lang = navigator.language.slice(0, 2);
    console.log("Detected language:", lang); // Add this line
    return lang === "ja" ? "ja" : "en";
}



function generateEvents(year, month) {
    const monthKey = (month + 1).toString().padStart(2, '0');
    const eventsForMonth = eventsDataGlobal[year]?.[monthKey] || [];

    // Start by clearing any existing events to avoid duplicates
    eventListElement.innerHTML = '';

    const eventsHTML = eventsForMonth.map(event => {
        const eventId = `event-${event.date.replace(/-/g, '_')}`;
        const lang = getCurrentLang();
        return `<li id="${eventId}" class="event-item" style="background-color: ${event.color};">
                    <div class="event-summary">
                        <div class="event-title">
                            <h4>${event.title[lang]}</h4>
                        </div>
                        <div class="event-info">
                            <p>${event.place[lang]}</p>
                            <p>${event.date}</p>
                        </div>
                    </div>
                    <div class="event-details" style="display: none;">
                        <p>${event.description[lang]}</p>
                        <img src="${event.imageUrl}" alt="${event.title[lang]}" class="event-image">
                    </div>
                </li>`;
    }).join('');

    console.log(eventsForMonth); // To see if events are being loaded correctly
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

    const lang = getCurrentLang(); // Get current language setting
    const monthName = langResources[lang].months[month];
    // Use eventsDataGlobal to get events for the specific month

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
        let eventForDay = eventsDataGlobal[year]?.[String(month + 1).padStart(2, '0')]?.find(event => event.date === dateString);

        if(eventForDay) { // Debugging line to see if events match the condition
            console.log(`Event found for day: ${i}`, eventForDay);
        }
        let eventId = eventForDay ? `event-${eventForDay.date.replaceAll('-', '_')}` : null;
        let dayClass = isToday ? "active" : eventForDay ? "has-event" : "";
        let dayStyle = isToday ? `style="background-color: #FFD700; border-radius: 50%;"` : eventForDay ? `style="background-color: ${eventForDay.color}; border-radius: 50%;"` : "";
        let dataEventId = eventForDay ? `data-event-id="event-${eventForDay.date.replaceAll('-', '_')}"` : "";
        
        calendarHTML += `<li class="${dayClass}" ${dayStyle} ${dataEventId ? `data-event-id="${eventId}"` : ''}>${i}</li>`;
    }

    // Determine the number of days to append from the next month
    let daysToAddForNextMonth = 6 - lastDayOfMonth;
    for (let i = 1; i <= daysToAddForNextMonth; i++) {
        calendarHTML += `<li class="inactive" style="opacity: 0.5;">${i}</li>`;
    }

    currentDateElement.innerText = `${monthName} ${year}`;
    dayElement.innerHTML = calendarHTML;

    
    // Attach event listeners for days with events
    document.querySelectorAll('.calendar-dates li.has-event').forEach(element => {
        // Inside your existing click event listener for calendar dates with events
        element.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            const eventElement = document.getElementById(eventId);
            if (eventElement) {
                eventElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Highlight the event detail section
                const details = eventElement.querySelector('.event-details');
                details.style.display = 'block'; // Ensure details are visible
                details.style.transition = 'background-color 0.5s ease'; // Smooth transition for background color
                details.style.backgroundColor = '#ffff99'; // Temporary highlight color

                // Scroll to the event element smoothly
                eventElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });

                // Remove the highlight after a few seconds
                setTimeout(() => {
                    details.style.backgroundColor = ''; // Revert to original background color
                }, 2000); // Adjust time as needed
            }
        });

    });

    // Call this function after you've generated your calendar and events to ensure the listeners are added
    addEventListenersToDays();
    
};

// Function to add click event listeners to calendar days with events
function addEventListenersToDays() {
    document.querySelectorAll('.calendar-dates li.has-event').forEach(element => {
        element.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            const eventElement = document.getElementById(eventId);

            // Close all event details
            document.querySelectorAll('.event-details').forEach(detail => {
                detail.style.display = 'none'; // Close detail
            });

            // Open the clicked event's details if not already open
            if (eventElement) {
                const details = eventElement.querySelector('.event-details');
                // Check if the clicked event's details are already open
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block'; // Open the clicked event's details
                    eventElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    details.style.display = 'none'; // Optionally close the clicked event's details if already open
                }
            }
        });
    });
}



// Function to navigate between months
// Adjust navigateMonth to accept and pass along eventsData
const navigateMonth = (increment) => {
    console.log(`Before increment: Month = ${currentMonth}, Year = ${currentYear}, Increment = ${increment}`);
    currentMonth += increment;
    if (currentMonth < 0) {
        currentYear --;
        currentMonth = 11; // Adjust for wrap-around to December
    } else if (currentMonth > 11) {
        currentYear ++;
        currentMonth = 0; // Adjust for wrap-around to January
    }
    console.log(`After increment: Month = ${currentMonth}, Year = ${currentYear}`);
    generateCalendar(currentYear, currentMonth); // Regenerate calendar and events with current data
    generateEvents(currentYear, currentMonth);
};



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


// At the very end of your script, after all function definitions
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar().catch(error => console.error("Failed to initialize the calendar:", error));
});

