
import Head from 'next/head';
import ScienceLinks from '../components/ScienceLinks';
import Navbar from '../components/navbar';

export default function ScienceLinksPage() {
    return (
        <>
            <Head>
                <title>Science Command Center | Grade 12 Simulators</title>
                <meta name="description" content="Interactive physics and chemistry simulations for Grade 12 students. Explore pendulums, circuits, optics, and molecular geometry." />
            </Head>
            <div className="bg-neutral-950 min-h-screen">
                <Navbar />
                <main className="pt-20">
                    <ScienceLinks />
                </main>
            </div>
        </>
    );
}
