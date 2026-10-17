import { FormEvent, ReactNode, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

type Language = "es" | "en";

const content = {
  es: {
    nav: ["Servicios", "Flota", "Cómo funciona", "Contacto"],
    navIds: ["servicios", "flota", "proceso", "contacto"],
    language: "EN",
    availability: "Sede en Bilbao",
    heroTitleA: "Tu tiempo merece",
    heroTitleB: "un viaje excepcional.",
    heroText:
      "Traslados privados con la precisión, discreción y atención que esperas. Un conductor profesional, siempre donde lo necesitas.",
    reserve: "Solicitar trayecto",
    whatsapp: "Hablar por WhatsApp",
    rating: "4,9/5 valoración media",
    trips: "+12.000 trayectos",
    punctuality: "98% puntualidad",
    introEyebrow: "Viajar bien cambia el destino",
    introTitle: "Cada trayecto, cuidado al detalle.",
    introText:
      "Desde la primera confirmación hasta tu llegada, coordinamos cada paso para que solo tengas que disfrutar del camino.",
    services: [
      {
        number: "01",
        title: "Traslados al aeropuerto",
        text: "Seguimiento de vuelo, recepción personalizada y tiempo de cortesía incluido.",
      },
      {
        number: "02",
        title: "Servicio corporativo",
        text: "Movilidad ejecutiva fiable para equipos, clientes y agendas exigentes.",
      },
      {
        number: "03",
        title: "Eventos y celebraciones",
        text: "Coordinación integral de vehículos para que cada invitado llegue a tiempo.",
      },
      {
        number: "04",
        title: "Disposición por horas",
        text: "Un conductor y vehículo premium a tu servicio durante el tiempo que necesites.",
      },
    ],
    fleetEyebrow: "Nuestra flota",
    fleetTitle: "Confort que se siente desde el primer minuto.",
    fleetText:
      "Vehículos premium de última generación, revisados a diario y preparados para ofrecer un entorno tranquilo, impecable y seguro.",
    fleetFeatures: ["Sin límite de pasajeros", "Climatización individual", "Agua y cargadores", "Servicio 24/7"],
    discover: "Consultar disponibilidad",
    processEyebrow: "Así de sencillo",
    processTitle: "Tres pasos. Cero preocupaciones.",
    steps: [
      ["01", "Cuéntanos tu trayecto", "Completa el formulario con los detalles de tu viaje."],
      ["02", "Recibe confirmación", "Nuestra central te enviará conductor, vehículo y precio cerrado."],
      ["03", "Disfruta del viaje", "Te recogemos puntualmente y nos ocupamos de todo lo demás."],
    ],
    formEyebrow: "Reserva tu VTC",
    formTitle: "¿Dónde quieres que te llevemos?",
    formText:
      "Haz clic en el mapa para marcar tu origen y destino, o completa el formulario directamente.",
    labels: {
      name: "Nombre y apellidos",
      phone: "Teléfono",
      email: "Correo electrónico",
      origin: "Punto de recogida",
      destination: "Destino",
      date: "Fecha",
      time: "Hora",
      passengers: "Pasajeros",
      notes: "Información adicional (opcional)",
    },
    placeholders: {
      name: "Tu nombre",
      phone: "+34 600 000 000",
      email: "nombre@correo.com",
      origin: "Haz clic en el mapa o escribe aquí",
      destination: "Haz clic en el mapa o escribe aquí",
      passengers: "Seleccionar",
      notes: "Vuelo, equipaje, silla infantil...",
    },
    passengers: ["1 pasajero", "2 pasajeros", "3 pasajeros", "4 pasajeros", "5+ pasajeros"],
    privacy: "Al enviar aceptas nuestra política de privacidad. Tus datos se tratarán solo para gestionar la solicitud.",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    successTitle: "Solicitud recibida",
    successText: "Gracias. Nuestra central se pondrá en contacto contigo lo antes posible.",
    footerText: "Traslados privados con conductor. Elegancia, puntualidad y confianza en cada trayecto.",
    quickLinks: "Enlaces",
    contact: "Contacto",
    legal: "Aviso legal",
    privacyLink: "Privacidad",
    cookies: "Cookies",
    rights: "Todos los derechos reservados.",
    photoAlt: "Vehículo premium negro preparado para un traslado privado",
    menuLabel: "Navegación principal",
  },
  en: {
    nav: ["Services", "Fleet", "How it works", "Contact"],
    navIds: ["servicios", "flota", "proceso", "contacto"],
    language: "ES",
    availability: "Based in the Basque Country",
    heroTitleA: "Your time deserves",
    heroTitleB: "an exceptional journey.",
    heroText:
      "Private transfers with the precision, discretion and care you expect. A professional driver, wherever you need one.",
    reserve: "Request a ride",
    whatsapp: "Chat on WhatsApp",
    rating: "4.9/5 average rating",
    trips: "12,000+ journeys",
    punctuality: "98% on time",
    introEyebrow: "The way you travel matters",
    introTitle: "Every journey, carefully considered.",
    introText:
      "From the first confirmation to your arrival, we coordinate every detail so you can simply enjoy the journey.",
    services: [
      {
        number: "01",
        title: "Airport transfers",
        text: "Flight tracking, personal welcome and complimentary waiting time included.",
      },
      {
        number: "02",
        title: "Corporate service",
        text: "Reliable executive transport for teams, clients and demanding schedules.",
      },
      {
        number: "03",
        title: "Events and celebrations",
        text: "End-to-end vehicle coordination so every guest arrives on time.",
      },
      {
        number: "04",
        title: "Hourly chauffeur",
        text: "A premium vehicle and driver at your service for as long as you need.",
      },
    ],
    fleetEyebrow: "Our fleet",
    fleetTitle: "Comfort you notice from the first minute.",
    fleetText:
      "Latest-generation premium vehicles, inspected daily and prepared to offer a calm, immaculate and safe environment.",
    fleetFeatures: ["No passenger limit", "Individual climate control", "Water and chargers", "24/7 service"],
    discover: "Check availability",
    processEyebrow: "Simple by design",
    processTitle: "Three steps. Zero worries.",
    steps: [
      ["01", "Tell us about your trip", "Complete the form with your journey details."],
      ["02", "Receive confirmation", "Our team will send your driver, vehicle and fixed price."],
      ["03", "Enjoy the journey", "We collect you on time and take care of everything else."],
    ],
    formEyebrow: "Book your VTC",
    formTitle: "Where can we take you?",
    formText:
      "Click on the map to set your pickup and dropoff points, or fill out the form directly.",
    labels: {
      name: "Full name",
      phone: "Phone",
      email: "Email address",
      origin: "Pick-up point",
      destination: "Destination",
      date: "Date",
      time: "Time",
      passengers: "Passengers",
      notes: "Additional information (optional)",
    },
    placeholders: {
      name: "Your name",
      phone: "+34 600 000 000",
      email: "name@email.com",
      origin: "Click on map or type here",
      destination: "Click on map or type here",
      passengers: "Select",
      notes: "Flight, luggage, child seat...",
    },
    passengers: ["1 passenger", "2 passengers", "3 passengers", "4 passengers", "5+ passengers"],
    privacy: "By sending, you accept our privacy policy. Your data will only be used to manage your request.",
    submit: "Send request",
    sending: "Sending...",
    successTitle: "Request received",
    successText: "Thank you. Our central team will contact you as soon as possible.",
    footerText: "Private chauffeur transfers. Elegance, punctuality and trust on every journey.",
    quickLinks: "Links",
    contact: "Contact",
    legal: "Legal",
    privacyLink: "Privacy",
    cookies: "Cookies",
    rights: "All rights reserved.",
    photoAlt: "Black premium vehicle ready for a private transfer",
    menuLabel: "Main navigation",
  },
};

function Icon({
  children,
  className = "size-5",
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      {children}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <Icon>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </Icon>
  );
}

const WHATSAPP_URL = "https://wa.me/34675608207";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1574556132230-13f004acffda?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800";

export default function App() {
  const [language, setLanguage] = useState<Language>("es");
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<string | null>(null);
  
  const t = content[language];

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && !mapContainer.hasChildNodes()) {
      const map = L.map("map").setView([43.2630, -2.9350], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      let routingControl: any = null;
      let waypoints: L.LatLng[] = [];

      map.on("click", (e: L.LeafletMouseEvent) => {
        waypoints.push(e.latlng);

        if (waypoints.length === 1) {
          L.marker(e.latlng).addTo(map).bindPopup("<b>Origen</b>").openPopup();
          const originInput = document.querySelector("input[name='origin']") as HTMLInputElement;
          if (originInput) originInput.value = `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`;
        } else if (waypoints.length === 2) {
          L.marker(e.latlng).addTo(map).bindPopup("<b>Destino</b>").openPopup();
          const destInput = document.querySelector("input[name='destination']") as HTMLInputElement;
          if (destInput) destInput.value = `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`;

          if (routingControl) {
            map.removeControl(routingControl);
          }

        // @ts-ignore
          routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            // @ts-ignore
            createMarker: () => null,
          } as any).addTo(map);
          
          routingControl.on('routesfound', (e: any) => {
            const routes = e.routes;
            const summary = routes[0].summary;
            const distanceKm = summary.totalDistance / 1000;
            const price = (5 + (distanceKm * 1.80)).toFixed(2); // Tarifa base + precio por km

            setEstimatedPrice(`${price} €`);
            setRouteInfo(`${distanceKm.toFixed(1)} km aprox.`);
          });

          waypoints = [];
        }
      });
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = import.meta.env.VITE_REQUEST_ENDPOINT as string | undefined;
    setFormState("sending");

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Request failed");
        setFormState("sent");
        form.reset();
        return;
      } catch {
        setFormState("idle");
        return;
      }
    }

    const subject = encodeURIComponent(`Nueva solicitud VTC · ${String(data.name || "")}`);
    const body = encodeURIComponent(
      Object.entries(data)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join("\n") + (estimatedPrice ? `\nPrecio estimado calculada en mapa: ${estimatedPrice}` : "")
    );
    window.location.href = `mailto:central@aeyvtc.es?subject=${subject}&body=${body}`;
    setFormState("sent");
    form.reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f2eb] text-[#152523]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#" className="group flex items-center gap-3 text-white" aria-label="A E Y VTC">
            <span className="grid size-9 place-items-center rounded-full border border-[#c9a96e]">
              <span className="font-serif text-xs leading-none tracking-tight text-[#d9bf8b]">ΑΕΥ</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label={t.menuLabel}>
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={`#${t.navIds[index]}`}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="rounded-full border border-white/25 px-3.5 py-2 text-xs font-semibold tracking-wider text-white transition hover:border-white/60"
            >
              {t.language}
            </button>
            <a
              href="#contacto"
              className="hidden items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-semibold text-[#10211f] transition hover:bg-[#dfc48e] sm:flex"
            >
              {t.reserve}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[820px] bg-[#10211f] lg:min-h-[760px]">
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt={t.photoAlt} className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,25,0.98)_0%,rgba(8,27,25,0.84)_43%,rgba(8,27,25,0.28)_78%,rgba(8,27,25,0.42)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,27,25,0.75)_0%,transparent_35%)]" />
          </div>
          <div className="relative mx-auto flex min-h-[820px] max-w-7xl items-center px-5 pb-32 pt-36 sm:px-8 lg:min-h-[760px] lg:px-10 lg:pb-24">
            <div className="max-w-3xl">
              <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#d5bd8b]">
                <span className="h-px w-9 bg-[#c9a96e]" />
                {t.availability}
              </div>
              <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.025em] text-white sm:text-7xl lg:text-[82px]">
                {t.heroTitleA}
                <span className="block italic text-[#d8bd87]">{t.heroTitleB}</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">{t.heroText}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contacto"
                  className="flex items-center justify-center gap-3 rounded-full bg-[#c9a96e] px-7 py-4 text-sm font-semibold text-[#10211f] transition hover:-translate-y-0.5 hover:bg-[#dfc48e]"
                >
                  {t.reserve}
                  <ArrowIcon />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  <Icon>
                    <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.7Z" />
                    <path d="M8.4 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.7c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.6 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .3-.2 1.5-.9 2.1-.6.6-1.5.8-2.4.6-1.1-.3-2.5-.8-4.3-2.4-2-1.8-3.2-4-3.3-5.2 0-.6.1-1.1.4-1.5Z" />
                  </Icon>
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="eyebrow">{t.introEyebrow}</p>
                <h2 className="section-title mt-5">{t.introTitle}</h2>
              </div>
              <p className="max-w-xl self-end text-lg leading-8 text-[#52615e]">{t.introText}</p>
            </div>
            <div className="mt-16 grid border-l border-t border-[#d9d4c8] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {t.services.map((service) => (
                <article
                  key={service.number}
                  className="group min-h-72 border-b border-r border-[#d9d4c8] bg-[#f5f2eb] p-7 transition duration-500 hover:bg-[#142a27] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-[#a68449]">{service.number}</span>
                    <span className="grid size-9 place-items-center rounded-full border border-[#cfc8b9] text-[#697370] transition group-hover:rotate-[-45deg] group-hover:border-white/20 group-hover:text-white">
                      <ArrowIcon />
                    </span>
                  </div>
                  <h3 className="mt-16 font-serif text-2xl leading-tight text-[#152523] transition group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#68736f] transition group-hover:text-white/60">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Mapa Interactivo con cálculo de rutas y precio */}
        <section className="px-5 py-16 sm:px-8 lg:px-10 bg-[#e9e4d9]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Calculadora de ruta</p>
                <h2 className="section-title mt-3">Haz clic en el mapa: Origen y Destino</h2>
              </div>
              {estimatedPrice && (
                <div className="bg-[#142a27] text-white px-6 py-3 rounded-xl shadow-md flex items-center gap-4">
                  <div>
                    <div className="text-xs text-[#c9a96e] uppercase tracking-wider">Precio estimado</div>
                    <div className="text-2xl font-serif">{estimatedPrice}</div>
                  </div>
                  {routeInfo && <div className="text-xs text-white/60 border-l border-white/20 pl-4">{routeInfo}</div>}
                </div>
              )}
            </div>
            <div 
              id="map" 
              className="h-[480px] w-full rounded-2xl shadow-lg border border-[#d9d4c8]"
            />
          </div>
        </section>

        <section id="contacto" className="bg-[#10211f] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[#d2b77f]">{t.formEyebrow}</p>
              <h2 className="mt-5 max-w-md font-serif text-5xl leading-[1.02] text-white sm:text-6xl">{t.formTitle}</h2>
              <p className="mt-7 max-w-md leading-7 text-white/60">{t.formText}</p>
            </div>
            <div className="bg-[#f5f2eb] p-6 sm:p-9 lg:p-11">
              {formState === "sent" ? (
                <div className="flex min-h-[540px] flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-[#dfe8df] text-[#234d3e]">
                    <Icon className="size-8"><path d="m5 12 4 4L19 6" /></Icon>
                  </span>
                  <h3 className="mt-6 font-serif text-4xl">{t.successTitle}</h3>
                  <p className="mt-4 max-w-md leading-7 text-[#68736f]">{t.successText}</p>
                  <button onClick={() => setFormState("idle")} className="mt-8 border-b border-[#9b7c43] pb-1 text-sm font-semibold text-[#5d4b2d]">
                    {t.reserve}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.labels.name} name="name" placeholder={t.placeholders.name} />
                  <Field label={t.labels.phone} name="phone" type="tel" placeholder={t.placeholders.phone} />
                  <Field label={t.labels.email} name="email" type="email" placeholder={t.placeholders.email} className="sm:col-span-2" />
                  <Field label={t.labels.origin} name="origin" placeholder={t.placeholders.origin} />
                  <Field label={t.labels.destination} name="destination" placeholder={t.placeholders.destination} />
                  <Field label={t.labels.date} name="date" type="date" />
                  <Field label={t.labels.time} name="time" type="time" />
                  <label className="field-label">
                    {t.labels.passengers}
                    <select name="passengers" required className="field-input">
                      <option value="">{t.placeholders.passengers}</option>
                      {t.passengers.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label className="field-label sm:col-span-2">
                    {t.labels.notes}
                    <textarea name="notes" rows={3} placeholder={t.placeholders.notes} className="field-input resize-none" />
                  </label>
                  <p className="text-xs leading-5 text-[#7b817e] sm:col-span-2">{t.privacy}</p>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="flex items-center justify-center gap-3 rounded-full bg-[#b99658] px-7 py-4 text-sm font-semibold text-[#10211f] transition hover:bg-[#c9a96e] disabled:opacity-60 sm:col-span-2"
                  >
                    {formState === "sending" ? t.sending : t.submit}
                    <ArrowIcon />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`field-label ${className}`}>
      {label}
      <input name={name} type={type} placeholder={placeholder} required className="field-input" />
    </label>
  );
}