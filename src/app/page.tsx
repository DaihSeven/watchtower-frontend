import ApiStatus from '@/components/ApiStatus';
import Cards from '@/layout/CardsPessoas';
import Carrossel from '@/layout/Carrossel';
import SobreNos from '@/layout/SobreNos';

export default function Home() {
  return (
    <section>
      <ApiStatus />
      <SobreNos/>
      <Cards/>
      <Carrossel/>
    </section>
  );
}
