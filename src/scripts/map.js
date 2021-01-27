(function () {
  let myMap;

  const init = () => {
    myMap = new ymaps.Map('map', {
      center: [55.661689, 37.747406],
      zoom: 16,
      controls: ['zoomControl'],
    });

    const coords = [
      [55.661562, 37.744073],
      [55.664009, 37.743813],
      [55.659647, 37.749661],
      [55.662750, 37.747100],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-21, -60],
    });

    coords.forEach((coord) => {
      myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
  };

  ymaps.ready(init);
}());
