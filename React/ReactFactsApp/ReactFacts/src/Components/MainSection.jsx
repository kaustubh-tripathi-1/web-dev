import './MainSection.css'

export default function MainSection() {
    return (
        <main className='facts-container'>
            <h2 className="sub-heading">Fun Facts about React</h2>
            <ul className="facts-list">
                <li className="list-items">Was first release in 2013</li>
                <li className="list-items">Was originally created by Jordan Walke</li>
                <li className="list-items">Has over 200K stars on GitHub</li>
                <li className="list-items">is maintained by Meta</li>
                <li className="list-items">Powers thousand of modern Web Apps, enterprise apps, including Mobile Apps</li>
            </ul>
        </main>
    )
}
