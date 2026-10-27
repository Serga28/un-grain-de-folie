import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="brand"><span className="seed">✳</span><span>Un Grain de Folie</span></div>
        <span className="pill">La communauté d'entraide</span>
      </header>

      <section className="hero">
        <div>
          <p className="pill" style={{display:"inline-block", marginBottom:18}}>Des échanges autrement</p>
          <h1>Les talents circulent.<br />Les liens se créent.</h1>
          <p className="lead">
            Un Grain de Folie est un espace d'échange entre membres, où chacun peut proposer
            un coup de main, partager un savoir-faire et recevoir de l'aide grâce aux Graines.
          </p>
          <p className="small">Application en préparation — accès réservé aux membres invités.</p>
        </div>
        <aside className="card">
          <h2>Le principe des Graines</h2>
          <div className="stat">10 <span style={{fontSize:18, letterSpacing:0}}>Graines / h</span></div>
          <p className="small">Valeur indicative proposée pour faciliter les échanges. Le montant se décide ensemble avant chaque échange.</p>
          <div style={{borderTop:"1px solid var(--border)", marginTop:22, paddingTop:18}}>
            <strong>Un équilibre collectif</strong>
            <p className="small">Quand un membre gagne des Graines, un autre en dépense autant. Le total des soldes reste à zéro.</p>
          </div>
        </aside>
      </section>

      <section className="section grid">
        <article className="tile"><div className="emoji">🤝</div><h3>Proposer son aide</h3><p>Partagez vos compétences, votre temps ou un service utile à la communauté.</p></article>
        <article className="tile"><div className="emoji">🌱</div><h3>Échanger en confiance</h3><p>Le montant est convenu à l'avance et l'échange est confirmé par les deux membres.</p></article>
        <article className="tile"><div className="emoji">🧭</div><h3>Faire vivre le collectif</h3><p>Un réseau privé où les besoins et les savoir-faire se rencontrent, sans conversion en euros.</p></article>
      </section>

      <div className="notice">
        <strong>Version de démarrage.</strong> Cette page est la première base visuelle du projet. Les comptes membres, les annonces et les transactions ne sont pas encore activés. Ils seront ajoutés après configuration sécurisée de la base de données.
      </div>
      <footer className="footer">Un Grain de Folie · Projet communautaire en construction</footer>
    </main>
  );
}
