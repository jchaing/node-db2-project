exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: 'US124566NT1',
          make: 'Honda',
          model: 'Accord',
          mileage: '15000',
          transmission: '',
          title_status: ''
        },
        {
          vin: 'US124566NT2',
          make: 'Toyota',
          model: 'Tacoma',
          mileage: '50000',
          transmission: '',
          title_status: ''
        },
        {
          vin: 'US124566NT3',
          make: 'Honda',
          model: 'Civic',
          mileage: '10000',
          transmission: 'Manual',
          title_status: 'Clean'
        },
        {
          vin: 'US124566NT4',
          make: 'Tesla',
          model: 'Model X',
          mileage: '45000',
          transmission: '',
          title_status: 'Clean'
        },
        {
          vin: 'US124566NT5',
          make: 'Rivian',
          model: 'Truck',
          mileage: '5',
          transmission: '',
          title_status: ''
        },
        {
          vin: 'US124566NT6',
          make: 'Acura',
          model: 'RDX',
          mileage: '5000',
          transmission: 'Automatic',
          title_status: 'Salvage'
        }
      ]);
    });
};
