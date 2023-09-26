/**
 * 
 */

axios.get('/freshstocks_web/SellerSalesServlet')
  .then(function (response) {
    // Handle the response (sales data)
    const salesData = response.data;
    console.log(salesData);


const coursesData = {
  labels: Object.keys(salesData).filter(course => course !== 'Total Revenue'),
  datasets: [{
    label: 'Courses Bought',
    data: Object.values(salesData).filter((_, index) => index !== 1),
    fill: false,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 7,
    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)'
  }]
};

const coursesCtx = document.getElementById('salesChart').getContext('2d');

new Chart(coursesCtx, {
  type: 'line',
  data: coursesData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  }
});



// revenue chart 

const revenueData = {
  labels: ['Total Revenue'],
  datasets: [{
    label: 'Total Revenue',
    data: [salesData['Total Revenue']],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

const totalProfitNumeric = salesData['Total Revenue'];

const revenuectx = document.getElementById('revenueChart').getContext('2d');

new Chart(revenuectx, {
  type: 'bar',
  data: revenueData,
  options: {
    scales: {
      x: {
        type: 'category',
        labels: ['Total Revenue'],
        ticks: {
          autoSkip: false
        }
      },
      y: {
        beginAtZero: true,
        stepSize: 1000 // Adjust as needed
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return 'Total Profit: ' + totalProfitNumeric;
          }
        }
      }
    }
  }
});




const coursesWithoutTotalRevenue = Object.keys(salesData).filter(course => course !== 'Total Revenue');
// Find the most popular course among the remaining courses
const mostPopularCourse = coursesWithoutTotalRevenue.reduce((a, b) => salesData[a] > salesData[b] ? a : b);

// Prepare data for the chart
const mostPopularData = {
  labels: [mostPopularCourse],
  datasets: [{
    label: [mostPopularCourse],
    data: [salesData[mostPopularCourse]],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Render the chart
const mostPopularCtx = document.getElementById('mostPopularChart').getContext('2d');

new Chart(mostPopularCtx, {
  type: 'bar',
  data: mostPopularData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  }
});



const leastPopularCourse = coursesWithoutTotalRevenue.reduce((a, b) => salesData[a] < salesData[b] ? a : b);

// Prepare data for the chart
const leastPopularData = {
  labels: [leastPopularCourse],
  datasets: [{
    label: [leastPopularCourse],
    data: [salesData[leastPopularCourse]],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Render the chart
const leastPopularCtx = document.getElementById('leastPopularChart').getContext('2d');

new Chart(leastPopularCtx, {
  type: 'bar',
  data: leastPopularData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  }
});





  })
  .catch(function (error) {
    console.error('Error fetching seller sales:', error);
  });