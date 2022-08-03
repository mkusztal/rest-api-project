import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    {concerts.map((con, index) => (
      <div key={index}>
        <Concert key={con._id} {...con} />
      </div>
    ))}
  </section>
);

export default Concerts;

