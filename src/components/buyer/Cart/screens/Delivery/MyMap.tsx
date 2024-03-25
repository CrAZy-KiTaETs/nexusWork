import React, { useState, useEffect } from 'react';
import { load } from '@2gis/mapgl'

function MyMap({ addresses }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let map;

    if (!mapLoaded) {
      load().then((mapglAPI) => {
        map = new mapglAPI.Map('mapContainer', {
          center: [73.083286, 49.815641],
          zoom: 13,
          key: 'd48d4ff2-411b-400c-ad13-4e538e8acda7',
          // key: "bfd8bbca-8abf-11ea-b033-5fa57aae2de7"
        });


        addresses.forEach((address, id) => {
          fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=Караганда, ${address}&fields=items.point&key=d48d4ff2-411b-400c-ad13-4e538e8acda7`)
            .then(response => response.json())
            .then(data => {
              console.log('DATA', data)
              const info = data.result.items[0]
              new mapgl.Marker(map, {
                coordinates: [info.point.lon, info.point.lat],
                label: {
                  text: info.name
                }
              })
              // const coordinates = data.result.items[0].point;
              // new mapglAPI.Marker(map, { coordinates });
            })
            .catch(error => console.error('Error geocoding address:', address, error));
        });

        // const marker = new mapgl.Marker(map, {
        //   coordinates: [73.083286, 49.815641],
        //   label: {
        //     text: 'Точка самовывоза №1',
        //     style: {
        //       color: "red",
        //       fontSize: "8px"
        //     }
        //   },
        //   // icon: 'someicon'
        // });
        // marker.on('click', (e) => {
        //   console.log('Вы нажали на ')
        // })

        setMapLoaded(true);
      });
    }

    // Удаляем карту при размонтировании компонента
    console.log('ВЫПОЛНЕНИЕ ');
    return () => map && map.destroy();
  }, []);

  return <>{/* В этом элементе будет отображаться карта */}</>;
}

export default MyMap;

// import React, { useState, useEffect } from 'react';
// // import { YMaps, Map, Placemark } from 'react-yandex-maps';
// import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// function MyMap({ addresses }) {
//   const [coords, setCoords] = useState([]);
//   console.log('Я РАБОТАЮ');

//   useEffect(() => {
//     const fetchCoords = async () => {
//       const promises = addresses.map(async (address) => {
//         try {
//           const response = await fetch(
//             `https://geocode-maps.yandex.ru/1.x/?apikey=f1f8ee50-3b27-46fc-bd20-3304e360ceba&format=json&geocode=${encodeURIComponent(
//               address,
//             )}`,
//           );
//           const data = await response.json();
//           const coords =
//             data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
//           return { address, coords: [Number(coords[1]), Number(coords[0])] };
//         } catch (error) {
//           console.error('Error geocoding address:', address, error);
//           return null;
//         }
//       });

//       const resolvedCoords = await Promise.all(promises);
//       setCoords(resolvedCoords.filter((coord) => coord !== null));
//     };

//     fetchCoords();
//   }, [addresses]);

//   return (
//     <>
//       {coords.length > 0 ? (
//         <YMaps>
//           <Map
//             defaultState={{ center: [49.80776, 73.088504], zoom: 13 }}
//             style={{ width: '100%', height: '100%' }}
//           >
//             {coords.map(({ address, coords }, index) => (
//               <Placemark key={index} geometry={coords} properties={{ hintContent: address }} />
//             ))}
//           </Map>
//         </YMaps>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// }

// export default MyMap;
