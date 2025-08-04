import { CircleMarker, MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet'

import { convertDateToString } from '@/lib'
import type { EventGeometry } from '@/types'

interface MapProps {
    geometries: EventGeometry[]
}

const swapCoordinates = (coordinates: [number, number]) => {
    return [coordinates[1], coordinates[0]] as [number, number]
}

export const Map = ({ geometries }: MapProps) => {
    const geometriesLength = geometries.length
    // find the center of the geometries
    const center = geometries.reduce(
        (acc, geometry) => {
            return [acc[0] + geometry.coordinates[0], acc[1] + geometry.coordinates[1]]
        },
        [0, 0],
    )
    center[0] /= geometriesLength
    center[1] /= geometriesLength

    const zoom = geometriesLength > 10 ? 3 : geometriesLength > 1 ? 5 : 8

    return (
        <MapContainer
            center={swapCoordinates(center as [number, number])}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            zoom={zoom}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geometries.map((geometry) => {
                if (geometry.type === 'Point') {
                    return (
                        <CircleMarker
                            center={swapCoordinates(geometry.coordinates)}
                            key={geometry.date}
                            radius={10}
                        >
                            <Tooltip>
                                {convertDateToString(geometry.date, true)}
                            </Tooltip>
                        </CircleMarker>
                    )
                }

                return (
                    <Polygon
                        fillColor="blue"
                        key={geometry.date}
                        positions={[swapCoordinates(geometry.coordinates)]}
                    />
                )
            })}
        </MapContainer>
    )
}
