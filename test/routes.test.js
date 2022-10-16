
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/app');
const {conn} = require('../src/db')





describe('/auth', function(){

    
    it('debe crear un usuario',function(){
        return request(app)
        .post('/auth/register')
        .send({
            userName: 'Username1',
            password: "AsdGrdfsd12!",
            email: "neuceuquaheima-85312@yopmail.com"    
        })
        .expect(201)
        .expect(function(res){
            expect(res.body).to.eql({msg:'Created user'})
        })
    })
    it('debe devolver un error si la contraseña es invalida',function(){
        return request(app)
        .post('/auth/register')
        .send({
            userName: 'Username1',
            password: "asd1!",
            email: "neuceuquaheima-85312@yopmail.com"    
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'invalid password'})
        })
    })
    it('debe devolver un error si es usuario es invalido',function(){
        return request(app)
        .post('/auth/register')
        .send({
            userName: 'asd1',
            password: "asd1!",
            email: "neuceuquaheima-85312@yopmail.com"    
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'invalid user'})
        })
    })
    it('debe devolver un error si es usuario es invalido',function(){
        return request(app)
        .post('/auth/register')
        .send({
            userName: 'Username123',
            password: "Asdasdasd12$",
            email: "123"    
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'invalid email'})
        })
    })

    it('debe devolver un error si el usuario no existe',function(){
        return request(app)
        .post('/auth/login')
        .send({
            userName: 'Username123',
            password: "Asdasdasd12$", 
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'Incorrect user or password'})
        })
    })

    it('debe devolver un error si el password es incorrecto',function(){
        return request(app)
        .post('/auth/login')
        .send({
            userName: 'Username1',
            password: "asdasd1", 
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'Incorrect user or password'})
        })
    })

    it('debe loggearse',function(){
        return request(app)
        .post('/auth/login')
        .send({
            userName: 'Username1',
            password: "AsdGrdfsd12!", 
        })
        .expect(200)
        .expect(function(res){
            token = res.body.token
        })
    })

    
    
})


describe('/movies', function(){
    it('debe crear una pelicula',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Eternals',
            img: 'www.img.com/123',
            release: '10/04/1994',
            score: 5,
            genres: 1
        })
        .expect(201)
        .expect(function(res){
            expect(res.body).to.eql('Created movie')
        })
    })

    it('debe arrojar un error si el titulo no es un string de hasta 50 caracteres',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 14,
            img: 'www.img.com/123',
            release: '10/04/1994',
            score: 5,
            genre: 1
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'incorrect values'})
        })
    })

    it('debe arrojar un error si la img no es una url',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Eternals',
            img: 'asd',
            release: '10/04/1994',
            score: 5,
            genres: 1
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'incorrect values'})
        })
    })

    it('debe arrojar un error si el score no es un entero entre 1 y 5',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Eternals',
            img: 'asd',
            release: '10/04/1994',
            score: 10,
            genres: 1
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'incorrect values'})
        })
    })

    it('debe arrojar un error si el id del genero no existe',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Toy Story',
            img: 'www.img.com/123',
            release: '10/04/1994',
            score: 5,
            genres: 2
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'not match IdGenre'})
        })
    })

    it('debe arrojar un error si el id del personaje no existe',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Toy Story',
            img: 'www.img.com/123',
            release: '10/04/1994',
            score: 5,
            genres: 1,
            characters: [1,3]
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'not match IdCharacters'})
        })
    })

    it('debe arrojar un error si el titulo de la pelicula ya existe',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            title: 'Eternals',
            img: 'www.img.com/123',
            release: '10/04/1994',
            score: 5,
            genres: 1
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'Movie already exist'})
        })
    })


    it('debe arrojar un error si no encuentra el id de la pelicula/serie',function(){
        return request(app)
        .get('/movies/2')
        .set({ "Authorization": `Bearer ${token}` })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'Not match id'})
        })
    })

    


})



describe('/characters', function(){
    it('debe crear una pelicula',function(){
        return request(app)
        .post('/characters/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            name: 'Jhon',
            img: 'www.img.com/123',
            age: 15,
            size: 54.5,
            story: 'Lorem ipsum'
        })
        .expect(201)
        .expect(function(res){
            expect(res.body).to.eql({msg:'character created'})
        })
    })

    it('debe arrojar un error si el nombre no es un string de hasta 50 caracteres',function(){
        return request(app)
        .post('/movies/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            name: 123,
            img: 'www.img.com/123',
            age: 15,
            size: 54.5,
            story: 'Lorem ipsum'
        })
        .expect(400)
        .expect(function(res){
            expect(res.body).to.eql({msg:'incorrect values'})
        })
    })


    


})