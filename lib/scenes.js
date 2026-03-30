import dynamic from 'next/dynamic';

const ForestNight = dynamic(() => import('@/components/scenes/forest_night'));
const Garden = dynamic(() => import('@/components/scenes/garden'));
const Sky = dynamic(() => import('@/components/scenes/sky'));
const Ocean = dynamic(() => import('@/components/scenes/ocean'));
const School = dynamic(() => import('@/components/scenes/school'));
const Space = dynamic(() => import('@/components/scenes/space'));
const Castle = dynamic(() => import('@/components/scenes/castle'));
const City = dynamic(() => import('@/components/scenes/city'));
const Underwater = dynamic(() => import('@/components/scenes/underwater'));
const Bedroom = dynamic(() => import('@/components/scenes/bedroom'));

export const SCENE_COMPONENTS = {
  forest_night: ForestNight,
  garden: Garden,
  sky: Sky,
  ocean: Ocean,
  school: School,
  space: Space,
  castle: Castle,
  city: City,
  underwater: Underwater,
  bedroom: Bedroom,
};

export function getSceneComponent(hint) {
  return SCENE_COMPONENTS[hint] || ForestNight; // Fallback to forest_night
}
