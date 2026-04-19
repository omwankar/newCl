'use client';

export function ServicePartners() {
  const servicePartners = [
    {
      name: 'Amazon',
      logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png',
    },
    {
      name: 'DPD',
      logo: 'https://www.dpd.com/wp-content/themes/DPD_NoLogin/images/DPD_logo_redgrad_rgb_responsive.svg',
    },
    {
      name: 'UPS',
      logo: 'https://www.ups.com/webassets/icons/logo.svg',
    },
    {
      name: 'DHL',
      logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
    },
    {
      name: 'DX Group',
      logo: 'https://www.dxdelivery.com/application/themes/the_escape/assets/images/dx-brand-identity.svg',
    },
    {
      name: 'Yodel',
      logo: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDUzLjUiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI0I1RDMzNCIgZD0iTTE1LjEgMzMuNkwwIDEuNGgxNGw3LjYgMjAuMyA3LjYtMjAuM2gxMy45bC0xNSAzMi4ydjE4LjVoLTEzek05Mi45IDEuNGgxNi44YzUuNyAwIDE1LjggMCAyMi40IDkuNCAzLjUgNC44IDQuNyAxMC4yIDQuNyAxNS43IDAgMTMuOC02LjkgMjUuNS0yNi4xIDI1LjVIOTIuOVYxLjR6bTEzIDM5LjNoNS41YzkuNyAwIDEyLjQtNi43IDEyLjQtMTMuOSAwLTIuOS0uNi02LjUtMi41LTkuNC0xLjUtMi4zLTQuMS00LjctOS45LTQuN2gtNS42djI4em0zMy45LTM5LjNoMjguN3YxMS40aC0xNS43djcuOEgxNjhWMzJoLTE1LjJ2OC43aDE1Ljd2MTEuNGgtMjguN3ptMzIuMyAwaDE2LjhWNDAuN2gxNXYxMS40aC0yNy45eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNCNUQzMzQiIGQ9Ik0zNy4yIDI2LjdDMzcuMiAxMiA0OS4yIDAgNjMuOSAwczI2LjcgMTIgMjYuNyAyNi43YzAgMTQuOC0xMiAyNi43LTI2LjcgMjYuN1MzNy4yIDQxLjUgMzcuMiAyNi43bTI2LjcgMTUuMUM3Mi4yIDQxLjggNzkgMzUgNzkgMjYuN3MtNi43LTE1LjEtMTUuMS0xNS4xYy04LjMgMC0xNS4xIDYuNy0xNS4xIDE1LjEuMSA4LjMgNi44IDE1LjEgMTUuMSAxNS4xIj48L3BhdGg+PC9zdmc+',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="app-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Our Service Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicePartners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex items-center justify-center min-h-[100px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeInUp cursor-pointer group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 max-w-[80%] object-contain grayscale-20 group-hover:grayscale-0 transition-all duration-300"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
