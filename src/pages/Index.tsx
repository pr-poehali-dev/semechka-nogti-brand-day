import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SEMECHKA NOGTI
            </h1>
            <div className="hidden md:flex gap-6">
              {['program', 'participants', 'tickets', 'location', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-medium hover:text-primary transition-colors capitalize"
                >
                  {section === 'program' && 'Программа'}
                  {section === 'participants' && 'Участники'}
                  {section === 'tickets' && 'Билеты'}
                  {section === 'location' && 'Локация'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button 
              onClick={() => scrollToSection('tickets')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Купить билет
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 text-lg px-6 py-2 bg-gradient-to-r from-primary to-secondary">
            4 января 2026 • Екатеринбург
          </Badge>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
              </div>
            ))}
          </div>

          <Button 
            size="lg" 
            onClick={() => scrollToSection('tickets')}
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity shadow-xl"
          >
            Забронировать билет
            <Icon name="ArrowRight" className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="program" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Программа
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Насыщенный день с мастер-классами и сюрпризами
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {program.map((item, idx) => (
              <Card 
                key={idx} 
                className="p-6 hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary"
              >
                <div className="text-3xl font-bold text-primary mb-3">{item.time}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="participants" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Участники
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Топовые мастера и эксперты нейл-индустрии
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {participants.map((person, idx) => (
              <Card 
                key={idx} 
                className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-white to-purple-50"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-xl font-semibold mb-1">{person.name}</h4>
                <Badge className="mb-2 bg-primary">{person.role}</Badge>
                <p className="text-muted-foreground">{person.specialty}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tickets" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Билеты
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите подходящий формат участия
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tickets.map((ticket, idx) => (
              <Card 
                key={idx} 
                className={`p-8 hover:shadow-2xl transition-all hover:scale-105 ${
                  idx === 1 ? 'border-4 border-primary shadow-xl scale-105' : ''
                }`}
              >
                {idx === 1 && (
                  <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">
                    Популярный
                  </Badge>
                )}
                <h4 className="text-3xl font-bold mb-4">{ticket.name}</h4>
                <div className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {ticket.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {ticket.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    idx === 1 
                      ? 'bg-gradient-to-r from-primary to-secondary' 
                      : 'bg-primary'
                  }`}
                >
                  Купить билет
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Локация
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Современное пространство в центре города
          </p>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <Icon name="MapPin" className="text-primary mt-1" size={24} />
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
                    <Icon name="Clock" className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Время</h4>
                      <p className="text-muted-foreground">
                        4 января 2026<br/>
                        10:00 - 19:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Car" className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Парковка</h4>
                      <p className="text-muted-foreground">
                        Бесплатная парковка<br/>
                        для участников события
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 h-80 flex items-center justify-center">
                  <Icon name="Map" size={120} className="text-primary/30" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Контакты
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Остались вопросы? Свяжитесь с нами
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Phone" className="text-primary" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Телефон</h4>
              <p className="text-muted-foreground">+7 (343) 123-45-67</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-secondary/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Mail" className="text-secondary" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-muted-foreground">hello@semechka-nogti.ru</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Instagram" className="text-accent" size={28} />
              </div>
              <h4 className="font-semibold mb-2">Instagram</h4>
              <p className="text-muted-foreground">@semechka_nogti</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-purple-100">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-lg">© 2025 SEMECHKA NOGTI. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
                