import ApiStatus from '@/components/ApiStatus';
import Cards from '@/layout/CardsPessoas';
import Carrossel from '@/layout/Carrossel';

export default function Home() {
  return (
    <section>
      <ApiStatus />
      <Carrossel/>
      <Cards/>
    </section>
  );
}
