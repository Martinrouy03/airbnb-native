import MapView, { Marker } from "react-native-maps";

export default function MyMapView({ obj }) {
  const { latitude, longitude, title, description } = obj;
  const markers = [
    {
      id: 1,
      latitude: latitude,
      longitude: longitude,
      title: title,
      description: description,
    },
  ];
  return (
    <MapView
      // La MapView doit obligatoirement avoir des dimensions
      style={{ flex: 1, height: 400 }}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      //   showsUserLocation={true}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </MapView>
  );
}
