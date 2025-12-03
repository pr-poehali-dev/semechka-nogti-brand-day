import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', ticket: 'Стандарт' });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const targetDate = new Date('2026-01-04T00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Спасибо, ${formData.name}! Регистрация успешна. Билет отправлен на ${formData.email}`);
    setRegistrationOpen(false);
    setFormData({ name: '', email: '', phone: '', ticket: 'Стандарт' });
  };

  const gallery = [
    { id: 1, title: 'Мастер-класс 2025' },
    { id: 2, title: 'Новая коллекция' },
    { id: 3, title: 'Nail-арт показ' },
    { id: 4, title: 'Презентация трендов' },
    { id: 5, title: 'Фотозона' },
    { id: 6, title: 'Networking' },
  ];

  const program = [
    { time: '10:00', title: 'Регистрация', description: 'Приветственный кофе и networking' },
    { time: '11:00', title: 'Открытие события', description: 'Презентация новых трендов SEMECHKA NOGTI' },
    { time: '12:00', title: 'Мастер-классы', description: 'Работа с новыми коллекциями' },
    { time: '14:00', title: 'Обед', description: 'Фуршет и общение' },
    { time: '15:00', title: 'Конкурсы', description: 'Розыгрыш призов от бренда' },
    { time: '17:00', title: 'Afterparty', description: 'Музыка, танцы, фотозона' },
  ];

  const participants = [
    { name: 'Анна Соколова', role: 'Топ-мастер', specialty: 'Nail-арт' },
    { name: 'Мария Петрова', role: 'Амбассадор', specialty: 'Дизайн ногтей' },
    { name: 'Елена Волкова', role: 'Технолог', specialty: 'Укрепление' },
    { name: 'Ольга Смирнова', role: 'Стилист', specialty: 'Тренды 2026' },
    { name: 'Дарья Кузнецова', role: 'Эксперт', specialty: 'Гель-лак' },
    { name: 'Ирина Новикова', role: 'Мастер', specialty: 'Маникюр' },
  ];

  const tickets = [
    { 
      name: 'Стандарт', 
      price: '2 500 ₽', 
      features: ['Вход на событие', 'Приветственный набор', 'Кофе-брейк'] 
    },
    { 
      name: 'VIP', 
      price: '5 000 ₽', 
      features: ['Всё из Стандарт', 'Фотосессия', 'Подарок от бренда', 'Зона VIP'] 
    },
    { 
      name: 'Мастер', 
      price: '8 000 ₽', 
      features: ['Всё из VIP', 'Личная консультация', 'Эксклюзивный набор', 'Сертификат участника'] 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-lg z-50 border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-accent">
              SEMECHKA NOGTI
            </h1>
            <div className="hidden md:flex gap-6">
              {['program', 'participants', 'gallery', 'tickets', 'location', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-medium text-white hover:text-accent transition-colors capitalize"
                >
                  {section === 'program' && 'Программа'}
                  {section === 'participants' && 'Участники'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'tickets' && 'Билеты'}
                  {section === 'location' && 'Локация'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <Button 
                onClick={() => scrollToSection('tickets')}
                className="hidden md:flex bg-accent text-black hover:bg-accent/90 transition-opacity"
              >
                Купить билет
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white">
                  <div className="flex flex-col gap-6 mt-8">
                    {['program', 'participants', 'gallery', 'tickets', 'location', 'contacts'].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className="text-left text-lg font-medium hover:text-accent transition-colors"
                      >
                        {section === 'program' && 'Программа'}
                        {section === 'participants' && 'Участники'}
                        {section === 'gallery' && 'Галерея'}
                        {section === 'tickets' && 'Билеты'}
                        {section === 'location' && 'Локация'}
                        {section === 'contacts' && 'Контакты'}
                      </button>
                    ))}
                    <Button 
                      onClick={() => {
                        scrollToSection('tickets');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-accent text-black hover:bg-accent/90 mt-4"
                    >
                      Купить билет
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 text-lg px-6 py-2 bg-black text-accent border-2 border-accent">
            4 января 2026 • Екатеринбург
          </Badge>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 text-black">
            День бренда<br/>SEMECHKA NOGTI
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Главное событие года для мастеров нейл-индустрии! Новые тренды, мастер-классы и незабываемые эмоции
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { value: timeLeft.days, label: 'дней' },
              { value: timeLeft.hours, label: 'часов' },
              { value: timeLeft.minutes, label: 'минут' },
              { value: timeLeft.seconds, label: 'секунд' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black border-2 border-accent rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-5xl md:text-6xl font-bold text-accent">
                  {item.value}
                </div>
                <div className="text-sm text-white mt-2">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-accent text-black hover:bg-accent/90 transition-opacity shadow-xl"
                >
                  Зарегистрироваться
                  <Icon name="UserPlus" className="ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-black">
                    Регистрация на событие
                  </DialogTitle>
                  <DialogDescription>
                    Заполните форму для участия в дне бренда SEMECHKA NOGTI
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRegistration} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Имя и фамилия</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Анна Иванова"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="anna@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (900) 123-45-67"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ticket">Тип билета</Label>
                    <select
                      id="ticket"
                      value={formData.ticket}
                      onChange={(e) => setFormData({...formData, ticket: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option>Стандарт</option>
                      <option>VIP</option>
                      <option>Мастер</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/90">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('tickets')}
              className="text-lg px-8 py-6 border-2 border-black hover:bg-black hover:text-white"
            >
              Узнать цены
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section 
        id="program" 
        ref={(el) => (sectionRefs.current['program'] = el)}
        className={`py-20 px-4 bg-muted transition-all duration-1000 ${
          visibleSections.has('program') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Программа
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Насыщенный день с мастер-классами и сюрпризами
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {program.map((item, idx) => (
              <Card 
                key={idx} 
                className="p-6 hover:shadow-xl transition-all hover:scale-105 border-2 border-muted hover:border-accent"
              >
                <div className="text-3xl font-bold text-accent mb-3">{item.time}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="participants" 
        ref={(el) => (sectionRefs.current['participants'] = el)}
        className={`py-20 px-4 transition-all duration-1000 ${
          visibleSections.has('participants') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Участники
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Топовые мастера и эксперты нейл-индустрии
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {participants.map((person, idx) => (
              <Card 
                key={idx} 
                className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-muted hover:border-accent"
              >
                <div className="w-24 h-24 rounded-full bg-black border-2 border-accent mx-auto mb-4 flex items-center justify-center text-accent text-3xl font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-xl font-semibold mb-1">{person.name}</h4>
                <Badge className="mb-2 bg-accent text-black">{person.role}</Badge>
                <p className="text-muted-foreground">{person.specialty}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="gallery" 
        ref={(el) => (sectionRefs.current['gallery'] = el)}
        className={`py-20 px-4 bg-muted transition-all duration-1000 ${
          visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Галерея
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Моменты с прошлых событий SEMECHKA NOGTI
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gallery.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 group cursor-pointer"
              >
                <div className="relative h-64 bg-muted border-2 border-accent flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon name="Image" size={80} className="text-accent/30 group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-4 left-4 right-4 text-accent font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="tickets" 
        ref={(el) => (sectionRefs.current['tickets'] = el)}
        className={`py-20 px-4 transition-all duration-1000 ${
          visibleSections.has('tickets') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Билеты
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите подходящий формат участия
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tickets.map((ticket, idx) => (
              <Card 
                key={idx} 
                className={`p-8 hover:shadow-2xl transition-all hover:scale-105 border-2 ${
                  idx === 1 ? 'border-accent bg-black text-white shadow-xl scale-105' : 'border-muted hover:border-accent'
                }`}
              >
                {idx === 1 && (
                  <Badge className="mb-4 bg-accent text-black">
                    Популярный
                  </Badge>
                )}
                <h4 className="text-3xl font-bold mb-4">{ticket.name}</h4>
                <div className={`text-5xl font-bold mb-6 ${
                  idx === 1 ? 'text-accent' : 'text-accent'
                }`}>
                  {ticket.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {ticket.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="Check" className="text-accent mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    idx === 1 
                      ? 'bg-accent text-black hover:bg-accent/90' 
                      : 'bg-black text-white hover:bg-black/90'
                  }`}
                >
                  Купить билет
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="location" 
        ref={(el) => (sectionRefs.current['location'] = el)}
        className={`py-20 px-4 transition-all duration-1000 ${
          visibleSections.has('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Локация
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Современное пространство в центре города
          </p>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-muted hover:border-accent">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <Icon name="MapPin" className="text-accent mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Адрес</h4>
                      <p className="text-muted-foreground">
                        г. Екатеринбург<br/>
                        ул. Ленина, 25<br/>
                        Event Space "Панорама"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-6">
                    <Icon name="Clock" className="text-accent mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Время</h4>
                      <p className="text-muted-foreground">
                        4 января 2026<br/>
                        10:00 - 19:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Car" className="text-accent mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Парковка</h4>
                      <p className="text-muted-foreground">
                        Бесплатная парковка<br/>
                        для участников события
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-muted border-2 border-accent h-80 flex items-center justify-center">
                  <Icon name="Map" size={120} className="text-accent/30" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section 
        id="contacts" 
        ref={(el) => (sectionRefs.current['contacts'] = el)}
        className={`py-20 px-4 bg-muted transition-all duration-1000 ${
          visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-5xl font-bold text-center mb-4 text-black">
            Контакты
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Остались вопросы? Свяжитесь с нами
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-muted hover:border-accent">
              <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Phone" className="text-accent" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Телефон</h4>
              <p className="text-muted-foreground">+7 (343) 123-45-67</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-muted hover:border-accent">
              <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Mail" className="text-accent" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-muted-foreground">hello@semechka-nogti.ru</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-muted hover:border-accent">
              <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Instagram" className="text-accent" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Instagram</h4>
              <p className="text-muted-foreground">@semechka_nogti</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-accent/20 bg-black">
        <div className="container mx-auto text-center text-white">
          <p className="text-lg">© 2025 SEMECHKA NOGTI. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
                