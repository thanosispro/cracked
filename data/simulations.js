// data/simulations.js
import { Zap, Waves, Orbit, Microscope, Radio, Activity, Magnet, Repeat } from 'lucide-react';

export const simulationsData = [
    {
        id: 'circuit',
        title: 'Circuit Construction',
        description: 'Interactive circuit simulator with resistors, capacitors, and inductors.',
        url: 'https://www.falstad.com/circuit/',
        category: 'physics',
        icon: <Zap className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'faraday',
        title: "Faraday's Law",
        description: 'Explore electromagnetic induction and magnetic flux changes.',
        url: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_all.html',
        category: 'physics',
        icon: <Orbit className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'pendulum',
        title: 'Simple Pendulum',
        description: 'Analyze period, length, and gravity effects on harmonic motion.',
        url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_all.html',
        category: 'physics',
        icon: <Activity className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'ac-generator',
        title: 'AC Generator',
        description: 'Visualize how mechanical energy converts to alternating current.',
        url: 'https://javalab.org/en/ac_generator_en/',
        category: 'physics',
        icon: <Zap className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'wheatstone',
        title: 'Wheatstone Bridge',
        description: 'Measure unknown electrical resistance using bridge balancing.',
        url: 'https://www.walter-fendt.de/html5/phen/wheatstonebridge_en.htm',
        category: 'physics',
        icon: <Zap className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'potentiometer',
        title: 'Potentiometer',
        description: 'Compare EMFs and measure internal resistance of cells.',
        url: 'https://www.walter-fendt.de/html5/phen/potentiometer_en.htm',
        category: 'physics',
        icon: <Zap className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'magnetic-field',
        title: 'Magnetic Field of Current',
        description: 'Observe magnetic field lines around a current-carrying wire.',
        url: 'https://www.walter-fendt.de/html5/phen/magneticfieldwire_en.htm',
        category: 'physics',
        icon: <Magnet className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'radioactivity',
        title: 'Radioactive Decay',
        description: 'Simulate the law of exponential decay in atomic nuclei.',
        url: 'https://www.walter-fendt.de/html5/phen/lawdecay_en.htm',
        category: 'physics',
        icon: <Radio className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'forced-oscillation',
        title: 'Forced Oscillation',
        description: 'Understand resonance and damped harmonic oscillators.',
        url: 'https://www.walter-fendt.de/html5/phen/resonance_en.htm',
        category: 'physics',
        icon: <Repeat className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'shm',
        title: 'Simple Harmonic Motion',
        description: 'Relationship between circular motion and linear SHM.',
        url: 'https://physics.bu.edu/~duffy/HTML5/SHM_circular_motion.html',
        category: 'physics',
        icon: <Activity className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'waves',
        title: 'Transverse & Longitudinal',
        description: 'Visualize particle movement in different wave types.',
        url: 'https://www.physicslens.com/longitudinal-and-transverse-waves/',
        category: 'physics',
        icon: <Waves className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'doppler',
        title: 'Doppler Effect',
        description: 'Explore frequency shifts and redshift phenomena.',
        url: 'https://javalab.org/en/doppler_effect_and_redshift_en/',
        category: 'physics',
        icon: <Waves className="w-8 h-8" />,
        color: 'cyan'
    },
    {
        id: 'Huygens',
        title: 'Huygens Principle',
        description: 'Explore the Huygens Principle and wave propagation.',
        url: 'https://evidentscientific.com/en/microscope-resource/tutorials/reflection/huygens',
        category: 'physics',
        icon: <Waves className="w-8 h-8" />,
        color: 'cyan'
    }
];