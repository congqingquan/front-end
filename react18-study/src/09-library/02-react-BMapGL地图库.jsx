import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';
import { useState } from 'react';
import { Button } from 'antd';

const App = () => {
    let points = [
        {
            id: 1,
            address: '红豆杉小区-9号楼',
            lng: 128.395419,
            lat: 44.944254,
        },
        {
            id: 2,
            address: '苇河林业局中学',
            lng: 128.398477,
            lat: 44.948784,
        },
    ];

    let [point, setPoint] = useState(points[0]);

    let handleClick = (id) => {
        setPoint(points.find((point) => point.id === id));
    };

    return (
        <>
            <Map center={{ lng: point.lng, lat: point.lat }} zoom="16">
                <Marker position={{ lng: point.lng, lat: point.lat }} />
                <NavigationControl />
                <InfoWindow position={{ lng: point.lng, lat: point.lat }} text={point.address} title={point.address} />
            </Map>
            {points.map((point) => (
                <Button key={point.id} onClick={() => handleClick(point.id)}>
                    {point.address}
                </Button>
            ))}
        </>
    );
};

export default App;
